import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { SearchbarCustomEvent, ScrollCustomEvent, RefresherCustomEvent } from '@ionic/core';

import { Order, Sort } from '../models/search-params.model';
import { SearchResult } from '../models/search-result.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher)
  refresher: IonRefresher;
  searchResult: SearchResult | null = null;
  sortBy: Sort | null = null;
  sortOptions: Sort[] = ['followers', 'repositories', 'joined'];
  orderBy: Order = 'desc';
  orderOptions: Order[] = ['asc', 'desc'];
  search: string | null = null;
  itemsPerPage = 30;
  private currentPage = 1;

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { queryParams } = this.activatedRoute.snapshot;
    const { sortBy, orderBy, search } = queryParams;
    this.orderBy = orderBy as Order || 'desc';
    this.sortBy = sortBy as Sort || null;
    if (search) {
      this.onSearchChange({
        detail: {
          value: search,
        },
      } as SearchbarCustomEvent);
    }
  }

  async onSearchChange(event: Partial<SearchbarCustomEvent>): Promise<void> {
    const { value } = event.detail;
    if (value) {
      this.search = value;
      const queryParams = {
        search: value,
        sort: this.sortBy,
        order: this.orderBy,
        perPage: this.itemsPerPage,
      };
      this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge',
      });
      this.userService.getUsers(queryParams).subscribe({
        next: (searchResult) => {
          this.searchResult = searchResult;
          this.infiniteScroll.disabled = false;
          this.refresher.disabled = false;
        },
        error: (error) => {
          this.infiniteScroll.disabled = true;
          this.refresher.disabled = true;
          if (error.status === 404) {
            this.searchResult.items = [];
          }
        },
        complete: () => {
          this.refresher.complete();
        }
      });
    }
  }

  async orderOrSortChanged(sort: Sort, order: Order): Promise<void> {
    this.sortBy = sort;
    this.orderBy = order;
    this.onSearchChange({
      detail: {
        value: this.search,
      },
    } as SearchbarCustomEvent);
  }

  onSearchClear(): void {
    this.search = null;
    this.searchResult = null;
    this.router.navigate([], {
      queryParams: {},
    });
  }

  async onScroll(): Promise<void> {
    if (this.currentPage * this.itemsPerPage < this.searchResult?.totalCount) {
      this.currentPage++;
      const queryParams = {
        search: this.search,
        sort: this.sortBy,
        order: this.orderBy,
        perPage: this.itemsPerPage,
        page: this.currentPage,
      };
      this.userService.getUsers(queryParams).subscribe({
        next: (searchResult) => {
          this.searchResult.items = this.searchResult?.items.concat(
            searchResult.items
          );
        },
        complete: () => {
          this.infiniteScroll.complete();
        }
      });
    } else {
      this.infiniteScroll.disabled = true;
    }
  }
}
