import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlateHeatmapComponent } from './plate-heatmap/plate-heatmap.component';
import { HeatmapScalebarComponent } from './plate-heatmap/heatmap-scalebar/heatmap-scalebar.component';
import { DistribPlotComponent } from './distrib-plot/distrib-plot.component';


@NgModule({
  declarations: [
    AppComponent,
    PlateHeatmapComponent,
    HeatmapScalebarComponent,
    DistribPlotComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
