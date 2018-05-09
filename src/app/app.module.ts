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
import { PlateHeatmapComponent } from './plate-heatmap/plate-heatmap.component';
import { HeatmapScalebarComponent } from './plate-heatmap/heatmap-scalebar/heatmap-scalebar.component';
import { DistribPlotComponent } from './distrib-plot/distrib-plot.component';
import { UploadFileComponent } from './header/upload-file/upload-file.component';
import { DwnldFilesComponent } from './header/dwnld-files/dwnld-files.component';
import { SaveFilesComponent } from './header/save-files/save-files.component';
import { HeatmapKeyComponent } from './heatmap-key/heatmap-key.component';
import { HeaderComponent } from './header/header.component';


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
    HeaderComponent
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
