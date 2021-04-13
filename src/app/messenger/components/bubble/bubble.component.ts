import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleComponent {
    @Input() public side: 'left' | 'right' = 'left';
}
