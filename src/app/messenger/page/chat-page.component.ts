import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthFacade} from '../store/auth/auth.facade';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
    public isLoading$: Observable<boolean>;

    constructor (private readonly authFacade: AuthFacade) {
        this.isLoading$ = this.authFacade.isLoading$;
    }

    public ngOnInit (): void {
    }
}
