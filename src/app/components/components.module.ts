import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { NgxEchartsModule } from "ngx-echarts";

import { PairChartDataComponent } from "@app/components/pair-chart-data/pair-chart-data.component";
import { PairBlockComponent } from "@app/components/pair-block/pair-block.component";
import { PairSearchBoxComponent } from "@app/components/pair-search-box/pair-search-box.component";
import { PairMarketDataComponent } from "@app/components/pair-market-data/pair-market-data.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  declarations: [
    PairBlockComponent,
    PairSearchBoxComponent,
    PairMarketDataComponent,
    PairChartDataComponent,
  ],
  exports: [
    PairBlockComponent,
  ]
})
export class ComponentsModule {
}
