import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableGrid } from './reusable-grid';
import { IReusableGrid } from '@shared';

describe('ReusableGrid', () => {
  let component: ReusableGrid;
  let fixture: ComponentFixture<ReusableGrid>;

  const mockGridData: IReusableGrid = {
    data: [
      {
        _id: 'USR-001',
        name: 'Amy Fox',
        age: 29,
        city: 'Omaha',
        amountSubscription: 19.99,
        dateSubscription: new Date(2025, 0, 15),
        active: true,
      },
      {
        _id: 'USR-002',
        name: 'Nick Pribyl',
        age: 34,
        city: 'Omaha',
        amountSubscription: 25.5,
        dateSubscription: new Date(2025, 1, 10),
        active: false,
      },
    ],
    columns: [
      { field: '_id', header: 'Id', fieldType: 'text' },
      { field: 'name', header: 'Name', fieldType: 'text' },
      { field: 'age', header: 'Age', fieldType: 'number' },
      { field: 'city', header: 'City', fieldType: 'text' },
      {
        field: 'amountSubscription',
        header: '$ Subscription',
        fieldType: 'currency',
        currencyCode: 'USD',
        currencyDisplay: 'symbol',
        locale: 'en-US',
      },
      { field: 'dateSubscription', header: 'Date Subscription', fieldType: 'date' },
      { field: 'active', header: 'Active', fieldType: 'boolean' },
    ],
    loading: false,
    error: null,
    pageIndex: 0,
    pageSize: 5,
    totalItems: 2,
  };

  async function setGridData(value: IReusableGrid | null | undefined) {
    fixture.componentRef.setInput('gridData', value);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ReusableGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  //only validates that the component is instantiated without breaking
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Validates the initial defensive state of the component
  //This covers the risk of the component failing before receiving @Input(), 
  // especially in real-world scenarios where the parent has not yet loaded data.
  it('should initialize with safe default values', () => {
    expect(component.gridState().data).toEqual([]);
    expect(component.gridState().columns).toEqual([]);
    expect(component.gridState().loading).toBeFalsy();
    expect(component.gridState().error).toBeNull();
    expect(component.displayedColumns).toEqual([]);
    expect(component.hasData()).toBeFalsy();
    expect(component.hasColumns()).toBeFalsy();
  });

  //Validates that the component can handle null input gracefully without throwing 
  // errors and that it normalizes the state to safe defaults.
  it('should normalize null input', async () => {
    await setGridData(null);

    expect(component.gridState().data).toEqual([]);
    expect(component.gridState().columns).toEqual([]);
    expect(component.gridState().totalItems).toBe(0);
    expect(component.gridState().pageIndex).toBe(0);
    expect(component.gridState().pageSize).toBe(5);
    expect(component.gridState().loading).toBeFalsy();
    expect(component.gridState().error).toBeNull();
  });

  //Verify that @Input() not only updates the signal state, but also the MatTableDataSource data, 
  // which is critical for rendering the table rows
  it('should assign datasource data when gridData input changes', async () => {
    await setGridData(mockGridData);

    expect(component.dataSource.data.length).toBe(2);
    expect((component.dataSource.data[0] as any)['name']).toBe('Amy Fox');
  });

  //Validates that the component correctly computes the displayed columns based on the input configuration,
  // and that the hasColumns() computed property reflects the presence of columns.
  it('should compute displayedColumns correctly', async () => {
    await setGridData(mockGridData);

    expect(component.displayedColumns).toEqual([
      '_id',
      'name',
      'age',
      'city',
      'amountSubscription',
      'dateSubscription',
      'active',
    ]);
    expect(component.hasColumns()).toBe(true);
  });

  //Validates the conditional branch of the template for loading state, ensuring that the 
  // loading message is displayed when the grid is in a loading state.
  it('should show loading message when loading is true', async () => {
    await setGridData({
      ...mockGridData,
      loading: true,
    });

    const nativeElement = fixture.nativeElement as HTMLElement;
    expect(nativeElement.textContent).toContain('Loading Data...');
  });

  //Validates the conditional branch of the template for error state, ensuring that the 
  // error message is displayed when the grid has an error.
  it('should show error message when error exists', async () => {
    await setGridData({
      ...mockGridData,
      loading: false,
      error: 'Server error',
    });
    const nativeElement = fixture.nativeElement as HTMLElement;
    expect(nativeElement.textContent).toContain('Server error');
  });

  //Validates the conditional branch of the template for the case where data exists but no columns are defined,
  // ensuring that the appropriate message is shown to the user.
  it('should show message when data exists but columns are missing', async () => {
    await setGridData({
      data: [{ id: 1, name: 'Amy' }],
      columns: [],
      loading: false,
      error: null,
    });
    const nativeElement = fixture.nativeElement as HTMLElement;
    expect(nativeElement.textContent).toContain('There is no column defined for this grid.');
  });

  //Validates that the component's normalization logic correctly filters out invalid column definitions,
  // such as those with empty field names or headers, and that only valid columns are retained in the grid state.
  //This covers the possibility that a bad configuration will break the table.
  it('should filter invalid columns during normalization', async () => {
    await setGridData({
      data: [{ id: 1, name: 'Amy' }],
      columns: [
        { field: 'id', header: 'Id', fieldType: 'number' },
        { field: '', header: 'Empty Field', fieldType: 'text' } as any,
        { field: 'name', header: '', fieldType: 'text' } as any,
        null as any,
        undefined as any,
      ],
      loading: false,
      error: null,
    });

    expect(component.gridState().columns.length).toBe(1);
    expect(component.gridState().columns[0].field).toBe('id');
  });

  //Validates that the component's template correctly renders the table headers based on 
  // the column definitions provided in the input data.
  it('should render headers correctly', async () => {
    await setGridData(mockGridData);
    const nativeElement = fixture.nativeElement as HTMLElement;
    const headerCells = Array.from(nativeElement.querySelectorAll('th.mat-mdc-header-cell')).map(
      (el) => el.textContent?.trim(),
    );

    expect(headerCells).toContain('Id');
    expect(headerCells).toContain('Name');
    expect(headerCells).toContain('Age');
    expect(headerCells).toContain('$ Subscription');
  });

  //Validates that the component's template correctly renders the table rows and applies the appropriate formatting
  // based on the field types defined in the column configuration.
  it('should render row values correctly', async () => {
    await setGridData(mockGridData);

    const nativeElement = fixture.nativeElement as HTMLElement;
    const text = nativeElement.textContent ?? '';

    expect(text).toContain('USR-001');
    expect(text).toContain('Amy Fox');
    expect(text).toContain('Omaha');
  });

  //Validates that the component applies the correct formatting for different field types, such as numbers, 
  // currency, dates, and booleans, based on the column configuration provided in the input data.
  it('should format number values', async () => {
    await setGridData(mockGridData);

    const nativeElement = fixture.nativeElement as HTMLElement;
    const text = nativeElement.textContent ?? '';

    expect(text).toContain('29');
    expect(text).toContain('34');
  });

  //This covers that the currency render does not use currencyCode, currencyDisplay or locale.
  it('should format currency values', async () => {
    await setGridData(mockGridData);

    const nativeElement = fixture.nativeElement as HTMLElement;
    const text = nativeElement.textContent ?? '';

    expect(text).toContain('$19.99');
    expect(text).toContain('$25.50');
  });

  //This covers that the date render does not use locale and uses the correct format.
  it('should format date values as dd/MM/yyyy', async () => {
    await setGridData(mockGridData);

    const nativeElement = fixture.nativeElement as HTMLElement;
    const text = nativeElement.textContent ?? '';

    expect(text).toContain('15/01/2025');
    expect(text).toContain('10/02/2025');
  });

  //This covers that the boolean render shows Yes/No for true/false values.
  it('should format boolean values as Yes/No', async () => {
    await setGridData(mockGridData);

    const nativeElement = fixture.nativeElement as HTMLElement;
    const text = nativeElement.textContent ?? '';

    expect(text).toContain('Yes');
    expect(text).toContain('No');
  });

  //Validates that the component's template correctly handles null values in the data rows,
  // ensuring that an em dash (—) is displayed instead of null or empty values, which is 
  // important for maintaining a consistent and user-friendly UI.
  it('should show em dash for null values', async () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    await setGridData({
      data: [
        {
          _id: 'USR-003',
          name: null,
          age: null,
          city: null,
          amountSubscription: null,
          dateSubscription: null,
          active: null,
        },
      ],
      columns: mockGridData.columns,
      loading: false,
      error: null,
    });

    const text = nativeElement.textContent ?? '';
    expect(text).toContain('—');
  });

  //Validates that the component's template correctly handles the case where there are columns defined but no data rows,
  // ensuring that the appropriate "no data" message is displayed to the user instead of an empty table.
  it('should show no data message when there are columns but no rows', async () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    await setGridData({
      data: [],
      columns: mockGridData.columns,
      loading: false,
      error: null,
    });

    expect(nativeElement.textContent).toContain('There is no data to show');
  });

  //Validates that the component's template correctly renders the MatPaginator only when there is data to paginate,
  // and that it is not rendered when there are no data rows, which is important for maintaining a clean UI.
  it('should render paginator only when data exists', async () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    await setGridData(mockGridData);

    let paginator = nativeElement.querySelector('mat-paginator');
    expect(paginator).toBeTruthy();

    await setGridData({
      data: [],
      columns: mockGridData.columns,
      loading: false,
      error: null,
    });
    paginator = nativeElement.querySelector('mat-paginator');
    expect(paginator).toBeFalsy();
  });

  //Validates that the component correctly assigns the MatPaginator and MatSort instances to the MatTableDataSource 
  // after the view has initialized, which is critical for enabling pagination and sorting functionality in the table.
  it('should assign paginator and sort after view init', async () => {
    await setGridData(mockGridData);

    expect(component.paginator).toBeTruthy();
    expect(component.sort).toBeTruthy();
    expect(component.dataSource.paginator).toBe(component.paginator);
    expect(component.dataSource.sort).toBe(component.sort);
  });

  //Validates that the trackByField function correctly returns the field name for a given column definition,
  // which is important for optimizing the rendering of table rows and preventing unnecessary re-renders.
  it('trackByField should return the column field', () => {
    const result = component.trackByField(0, {
      field: 'name',
      header: 'Name',
    });

    expect(result).toBe('name');
  });
});
