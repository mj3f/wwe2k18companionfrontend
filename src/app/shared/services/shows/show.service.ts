import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {BaseService} from '../base.service';
import {Observable} from 'rxjs/Observable';
import {Paged} from '../../models/paged.model';
import {Show} from '../../models/shows/show.model';
import { Championship } from '../../models/championships/championship.model';
import { Wrestler } from '../../models/wrestlers/wrestler.model';

@Injectable()
export class ShowService extends BaseService { // TODO: Rename ShowService :P

  constructor(_http: Http) {
    super(_http);
    this.actionUrl += 'v0/show';
  }

  public getShows(pageNumber: number): Observable<Paged<Show>> {
      return this._http.get(this.actionUrl + '?page=' + pageNumber, this.getRequestOptions())
          .map((data) => {
            return data.json();
          });
  }

  public getAllShows(): Observable<Show[]> {
      return this._http.get(this.actionUrl + '/all', this.getRequestOptions())
          .map((data) => {
            return data.json();
          });
  }

  public getShowById(id: number): Observable<Show> {
      return this._http.get(this.actionUrl + '/' + id, this.getRequestOptions())
          .map((data) => {
                return data.json();
          });
  }

  public getChampionshipsForShow(id: number): Observable<Paged<Championship>> {
      return this._http.get(this.actionUrl + '/' + id + '/championships', this.getRequestOptions())
          .map(data => data.json());
  }

  public getRoster(id: number, pageNumber: number): Observable<Paged<Wrestler>> {
      return this._http.get(`${this.actionUrl}/${id}/roster?page=${pageNumber}`, this.getRequestOptions())
        .map(data => data.json());
  }

  public updateShow(show: Show): Observable<Response> {
      return this._http.put(this.actionUrl + '/' + show.id, JSON.stringify(show), this.getRequestOptions());
  }

  public createShow(show: Show): Observable<Response> {
      return this._http.post(this.actionUrl, JSON.stringify(show), this.getRequestOptions());
  }

  public deleteShow(id: number): Observable<Response> {
      return this._http.delete(this.actionUrl + '/' + id, this.getRequestOptions());
  }

}
