import { ListUser } from './list-user.model';

export interface SearchResult {
  totalCount: number;
  incompleteResults: boolean;
  items: ListUser[];
}
