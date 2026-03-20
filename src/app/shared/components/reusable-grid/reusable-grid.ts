import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IReusableGrid, IReusableGridColumn } from '@shared/interfaces';

@Component({
  selector: 'app-reusable-grid',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './reusable-grid.html',
  styleUrl: './reusable-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReusableGrid implements AfterViewInit {
  _gridData: WritableSignal<IReusableGrid> = signal({
    data: [],
    columns: [],
    totalItems: 0,
    loading: false,
    error: null,
  });

  hasColumns = computed(() => this.displayedColumns.length > 0);
  hasData = computed(() => this._gridData() && (this._gridData()?.data?.length ?? 0) > 0);
  get noDataMessage(): string {
    return 'There is no data to show';
  }
  get loadingMessage(): string {
    return 'Loading Data...';
  }

  paginator?: MatPaginator;
  sort?: MatSort;

  dataSource = new MatTableDataSource<IReusableGrid>([]);

  @ViewChild(MatPaginator)
  set matPaginator(value: MatPaginator | undefined) {
    if (value) {
      this.paginator = value;
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort)
  set matSort(value: MatSort | undefined) {
    if (value) {
      this.sort = value;
      this.dataSource.sort = value;
    }
  }

  @Input()
  set gridData(value: IReusableGrid | null | undefined) {
    let normalizedData = this.nornmalizeData(value);
    this._gridData.set(normalizedData);
    this.dataSource.data = normalizedData.data;
    this.assignDataSource();
  }

  get displayedColumns(): string[] {
    return this._gridData()?.columns?.map((col) => col.field) || [];
  }

  ngAfterViewInit(): void {
    this.assignDataSource();
  }

  trackByField(index: number, col: IReusableGridColumn): string {
    return col.field || `${index}`;
  }

  assignDataSource() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  private nornmalizeData(value: IReusableGrid | null | undefined): Required<IReusableGrid> {
    return {
      data: Array.isArray(value?.data) ? value!.data : [],
      columns: Array.isArray(value?.columns)
        ? value!.columns.filter(
            (col): col is IReusableGridColumn => !!col && !!col.field && !!col.header,
          )
        : [],
      totalItems: value?.data ? value!.data!.length : 0,
      loading: !!value?.loading,
      error: value?.error ?? null,
      pageIndex: value?.pageIndex ?? 0,
      pageSize: value?.pageSize ?? 5,
    };
  }
}
