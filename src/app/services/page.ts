export interface Page<T>{
  content: Array<T>;
  number: number;
  size: number;
  totalPages: number;
  totalElements: number;
}
