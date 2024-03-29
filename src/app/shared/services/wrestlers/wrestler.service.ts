import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Http, Response } from '@angular/http';
import { Wrestler } from '../../models/wrestlers/wrestler.model';
import { Paged } from '../../models/paged.model';
import { Observable } from 'rxjs/Observable';
import { ChampionshipReign } from '../../models/championships/championship-reign.model';
import { Rivalry } from '../../models/wrestlers/rivalry.model';

@Injectable()
export class WrestlerService extends BaseService {

    constructor(_http: Http) {
        super(_http);
        this.actionUrl += 'v0/wrestler';
    }

    public getWrestlers(pageNumber: number): Observable<Paged<Wrestler>> {
        return this._http.get(this.actionUrl + '?page=' + pageNumber, this.getRequestOptions())
            .map((data) => {
                return data.json();
            });
    }

    public getWrestlerById(id: number): Observable<Wrestler> {
        return this._http.get(this.actionUrl + '/' + id, this.getRequestOptions())
            .map((data) => {
                return data.json();
            });
    }

    public getChampionshipRegins(wrestlerId: number): Observable<Paged<ChampionshipReign>> {
        return this._http.get(this.actionUrl + '/' + wrestlerId + '/championship-reigns', this.getRequestOptions())
            .map(data => data.json());
    }

    public getRivalries(wrestlerId: number): Observable<Paged<Rivalry>> {
        return this._http.get(this.actionUrl + '/' + wrestlerId + '/rivalries', this.getRequestOptions())
            .map(data => data.json());
    }

    public updateWrestler(wrestler: Wrestler): Observable<Response> {
        return this._http.put(this.actionUrl + '/' + wrestler.id, JSON.stringify(wrestler), this.getRequestOptions());
    }

    public createWrestler(wrestler: Wrestler): Observable<Response> {
        return this._http.post(this.actionUrl, JSON.stringify(wrestler), this.getRequestOptions());
    }

    public deleteWrestler(id: number): Observable<Response> {
        return this._http.delete(this.actionUrl + '/' + id, this.getRequestOptions());
    }
}
