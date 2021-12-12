import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pair } from "@shared/models";

@Component({
  selector: 'app-pair-market-data',
  templateUrl: './pair-market-data.component.html',
  styleUrls: ['pair-market-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PairMarketDataComponent {
  @Input() pair!: Pair;

}
