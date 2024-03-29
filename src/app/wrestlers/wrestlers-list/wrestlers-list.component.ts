import { Component, OnInit } from '@angular/core';
import { Paged } from '../../shared/models/paged.model';
import { Wrestler } from '../../shared/models/wrestlers/wrestler.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { WrestlerService } from '../../shared/services/wrestlers/wrestler.service';
import { WrestlerRivalsResolverService } from '../../shared/services/wrestlers/wrestler-rivals-resolver.service';

@Component({
  selector: 'app-wrestlers-list',
  templateUrl: './wrestlers-list.component.html',
  styleUrls: ['./wrestlers-list.component.css']
})
export class WrestlersListComponent implements OnInit {

    public pageOffset = 0;
    public columns = [
        { name: 'Name', prop: 'name' },
        { name: 'Hometown', prop: 'hometown' },
        { name: 'Height', prop: 'height' },
        { name: 'Weight', prop: 'weight' }
    ];

    public wrestlers: Paged<Wrestler>;

    constructor(private _wrestlerService: WrestlerService,
                private _router: Router,
                private _wrestlerRivalLookupService: WrestlerRivalsResolverService) {
    }

    ngOnInit() {
        this.serviceGetWrestlers(0);
    }

    public goToPage(pageNumber: number): void {
        this.pageOffset = pageNumber;
        this.serviceGetWrestlers(pageNumber);
    }

    public goToView(wrestler: Wrestler): void {
        this._router.navigate(['wrestlers/view', wrestler.id]);
    }

    public createWrestler(show): void {
        this.serviceCreateShow(show).add(() => {
            this.serviceGetWrestlers(this.pageOffset);
        });
    }

    private serviceGetWrestlers(page: number): Subscription {
        return this._wrestlerService.getWrestlers(page).subscribe((data: Paged<Wrestler>) => {
            this.wrestlers = data;
            this._wrestlerRivalLookupService.allWrestlersForRivalryLookup = data.data;
        });
    }

    private serviceCreateShow(wrestler: Wrestler): Subscription {
        return this._wrestlerService.createWrestler(wrestler).subscribe();
    }

}
