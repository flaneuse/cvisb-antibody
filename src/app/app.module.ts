import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Helpers
import { AppRoutingModule } from './/app-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

// services
import { GetDataService } from './services/get-data.service';

// custom components
import { AppComponent } from './app.component';
import { PlateHeatmapComponent } from './plates/plate-heatmap/plate-heatmap.component';
import { HeatmapScalebarComponent } from './plates/heatmap-scalebar/heatmap-scalebar.component';
import { DistribPlotComponent } from './plates/distrib-plot/distrib-plot.component';
import { UploadFileComponent } from './header/upload-file/upload-file.component';
import { DwnldFilesComponent } from './header/dwnld-files/dwnld-files.component';
import { SaveFilesComponent } from './header/save-files/save-files.component';
import { HeatmapKeyComponent } from './plates/heatmap-key/heatmap-key.component';
import { HeaderComponent } from './header/header.component';
import { PlatesComponent } from './plates/plates.component';
import { OverviewComponent } from './overview/overview.component';
import { SortedDotplotComponent } from './sorted-dotplot/sorted-dotplot.component';


@NgModule({
  declarations: [
    AppComponent,
    PlateHeatmapComponent,
    HeatmapScalebarComponent,
    DistribPlotComponent,
    UploadFileComponent,
    DwnldFilesComponent,
    SaveFilesComponent,
    HeatmapKeyComponent,
    HeaderComponent,
    PlatesComponent,
    OverviewComponent,
    SortedDotplotComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [
    GetDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
