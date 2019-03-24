import {Route, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {ShowsListComponent} from './shows/shows-list/shows-list.component';
import {ShowsViewComponent} from './shows/shows-view/shows-view.component';
import {WrestlersListComponent} from './wrestlers/wrestlers-list/wrestlers-list.component';
import {WrestlersViewComponent} from './wrestlers/wrestlers-view/wrestlers-view.component';
import {ChampionshipListComponent} from './championships/championship-list/championship-list.component';
import {ChampionshipViewComponent} from './championships/championship-view/championship-view.component';
import {WrestlersComponent} from './wrestlers/wrestlers.component';
import {ShowsComponent} from './shows/shows.component';


export const ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'championships', component: ChampionshipListComponent, canActivate: [AuthGuard] },
    { path: 'championships/:id', component: ChampionshipViewComponent, canActivate: [AuthGuard] },
    {
        path: 'wrestlers',
        component: WrestlersComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: WrestlersListComponent },
            { path: 'view/:id', component: WrestlersViewComponent }
        ]
    },
    {
        path: 'shows',
        component: ShowsComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ShowsListComponent },
            { path: 'view/:id', component: ShowsViewComponent }
        ]
    },

    // { path: 'auth/logout', component: LogoutComponent, canActivate: [AuthGuard] },
    // { path: 'auth/changepassword', component: AuthChangePasswordComponent, canActivate: [AuthGuard] }, // Temp, remove
    // { path: '404', component: NoContentComponent },
    // { path: '**', component: NoContentComponent }

    //  { path: 'forgot-password', component: ForgotPasswordComponent },
];
