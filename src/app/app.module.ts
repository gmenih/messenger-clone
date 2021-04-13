import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {rootReducer} from './messenger/store/root.reducer';
import {HomeComponent} from './page/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        StoreModule.forRoot(rootReducer()),
        StoreDevtoolsModule.instrument({
            logOnly: environment.production,
        }),
        EffectsModule.forRoot(),
        BrowserAnimationsModule,
        RouterModule.forRoot([
            {
                path: 'm',
                loadChildren: () => import('./messenger/messenger.module').then(m => m.MessengerModule),
            },
            {
                path: '**',
                component: HomeComponent,
            },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
