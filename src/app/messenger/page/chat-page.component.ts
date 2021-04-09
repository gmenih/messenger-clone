import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {startAuthentication} from '../store/auth/auth.effects';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
    constructor (
        private readonly route: ActivatedRoute,
        private readonly store: Store,
    ) {}

    public ngOnInit (): void {
        const pollId = this.route.snapshot.paramMap.get('id');

        if (!pollId) {
            console.log('off, no poll ID');
            return;
        }

        this.store.dispatch(startAuthentication({pollId}));
    }
}
