export type Sort = 'followers' | 'repositories' | 'joined';
export type Order = 'asc' | 'desc';

export interface SearchParams {
  search?: string;
  page?: number;
  perPage?: number;
  since?: number;
  sort?: Sort;
  order?: Order;
}
