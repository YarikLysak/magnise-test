import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { ApiService } from "@shared/services";

@Component({
  selector: 'app-pair-block',
  templateUrl: './pair-block.component.html',
})
export class PairBlockComponent implements OnDestroy {
  private destroy$ = new Subject<void>()

  constructor(public apiService: ApiService) {
    apiService.loadHistoryCurrencyPair().pipe(takeUntil(this.destroy$)).subscribe();
    apiService.loadPairData().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
