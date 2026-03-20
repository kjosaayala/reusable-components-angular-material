export interface IReusableGrid {
  data?: any[];
  columns?: IReusableGridColumn[];
  pageSize?: number;
  pageIndex?: number;
  totalItems?: number;
  loading?: boolean;
  error?: string | null;
}

export interface IReusableGridColumn extends CurrencyColumns {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  fieldType?: 'text' | 'number' | 'date' | 'boolean' | 'currency';
  width?: string;
  autosize?: boolean;
}

interface CurrencyColumns {
  currencyCode?: string;
  currencyDisplay?: 'code' | 'symbol' | 'symbol-narrow';
  digitsInfo?: string;
  locale?: string;
}
