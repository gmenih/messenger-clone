import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-dots',
  templateUrl: './loading-dots.component.html',
  styleUrls: ['./loading-dots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingDotsComponent {}
