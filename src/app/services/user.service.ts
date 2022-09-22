import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GitHubUser } from '../models/git-hub-user.model';
import { SearchResult } from '../models/search-result.model';
import { SearchParams } from '../models/search-params.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {}

  public getUsers(params?: SearchParams): Observable<SearchResult> {
    params = Object.keys(params ?? {}).reduce((acc, key) => {
      if (params[key]) {
        acc[key] = params[key];
      }
      return acc;
    }, {} as SearchParams);
    return this.httpClient.get<SearchResult>(`${this.baseApiUrl}/users`, {
      params: (params as Record<string, string>),
    });
  }

  public getUser(username: string): Observable<GitHubUser> {
    return this.httpClient.get<GitHubUser>(
      `${this.baseApiUrl}/users/${username}`
    );
  }
}
