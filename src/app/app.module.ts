import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule } from "@app/components/components.module";
import { AppComponent } from "@app/app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    ComponentsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
