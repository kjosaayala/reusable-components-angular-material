import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableGrid } from './reusable-grid';

describe('ReusableGrid', () => {
  let component: ReusableGrid;
  let fixture: ComponentFixture<ReusableGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ReusableGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
