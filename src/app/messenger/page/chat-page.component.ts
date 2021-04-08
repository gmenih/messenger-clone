import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
    constructor (
        private readonly route: ActivatedRoute,
        private readonly authService: AuthenticationService,
    ) {}

    public ngOnInit (): void {
        const pollId = this.route.snapshot.paramMap.get('id');

        if (!pollId) {
            console.log('Oops, no poll ID');
            return;
        }

        this.authService.authenticateMagicLink(pollId);

        console.log(pollId);
    }
}
