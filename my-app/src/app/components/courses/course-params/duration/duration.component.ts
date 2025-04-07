import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DurationPipe } from 'src/app/pipes/duration.pipe';

@Component({
  selector: 'app-duration',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, DurationPipe],
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationComponent {
  @Input() duration!: number;
}
