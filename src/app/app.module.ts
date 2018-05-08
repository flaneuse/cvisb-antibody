import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Helpers
import { AppRoutingModule } from './/app-routing.module';
import { MaterialModule } from './material.module';

// services
import { GetDataService } from './services/get-data.service';

import { AppComponent } from './app.component';
import { PlateHeatmapComponent } from './plate-heatmap/plate-heatmap.component';
import { HeatmapScalebarComponent } from './plate-heatmap/heatmap-scalebar/heatmap-scalebar.component';
import { DistribPlotComponent } from './distrib-plot/distrib-plot.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DwnldFilesComponent } from './dwnld-files/dwnld-files.component';


@NgModule({
  declarations: [
    AppComponent,
    PlateHeatmapComponent,
    HeatmapScalebarComponent,
    DistribPlotComponent,
    UploadFileComponent,
    DwnldFilesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    GetDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
