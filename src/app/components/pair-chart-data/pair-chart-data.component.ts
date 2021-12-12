import { Component, Input } from '@angular/core';
import { DatePipe } from "@angular/common";
import { EChartsOption } from "echarts";
import { HistoryPair } from "@shared/models";

@Component({
  selector: 'app-pair-chart-data',
  templateUrl: './pair-chart-data.component.html',
  providers: [DatePipe],
})
export class PairChartDataComponent {
  public options!: EChartsOption;

  @Input() set data(value: HistoryPair[]) {
    this.options = {
      legend: { data: ['bar'], align: 'left' },
      xAxis: { data: this.generateChartAxisNames(value) },
      yAxis: {},
      series: [{ type: 'line', data: value!.map(history => history.price) }],
      tooltip: { trigger: 'axis' },
    }
  }

  constructor(private datePipe: DatePipe) {
  }

  private generateChartAxisNames(pairHistory: HistoryPair[]): string[] {
    return pairHistory.map(historyItem => this.datePipe.transform(historyItem.time, 'mediumDate') || historyItem.time)
  }
}
