import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyzeFilesComponent } from './analyze-files/analyze-files.component';
import { PlatesComponent } from './plates/plates.component';
import { OverviewComponent } from './overview/overview.component';
import { SortedDotplotComponent } from './sorted-dotplot/sorted-dotplot.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'upload', component: AnalyzeFilesComponent, pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent, pathMatch: 'full' },
  { path: 'plates', component: PlatesComponent, pathMatch: 'full' },
  { path: 'sorted', component: SortedDotplotComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      { enableTracing: false } // <-- true = debugging purposes
    )],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
