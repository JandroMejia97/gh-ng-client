import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchbarCustomEvent } from '@ionic/core';

import { Order, Sort } from '../models/search-params.model';
import { SearchResult } from '../models/search-result.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchResult: SearchResult | null = null;
  sortBy: Sort | null = null;
  orderBy: Order = 'desc';
  search: string | null = null;

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

  async onSearchChange(event: SearchbarCustomEvent) {
    const { value } = event.detail;
    if (value) {
      this.search = value;
      const queryParams = {
        search: value,
        sort: this.sortBy,
        order: this.orderBy,
      };
      this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge',
      });
      this.userService.getUsers(queryParams).subscribe((searchResult) => {
        this.searchResult = searchResult;
      });
    }
  }
}
