import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// import { OverviewComponent } from './overview/overview.component';
// import { PatientComponent } from './patient/patient.component';
// import { SamplesComponent } from './samples/samples.component';
// import { NamingConventionsComponent } from './naming-conventions/naming-conventions.component';
// import { PatientTrackerComponent } from './patient-tracker/patient-tracker.component';
// import { ExptTrackerComponent } from './expt-tracker/expt-tracker.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  // { path: 'overview', component: OverviewComponent, pathMatch: 'full' },
  // { path: 'patient', component: PatientComponent, pathMatch: 'full' },
  // { path: 'samples', component: SamplesComponent, pathMatch: 'full' },
  // { path: 'sample-naming', component: NamingConventionsComponent, pathMatch: 'full' },
  // { path: 'patient-tracker', component: PatientTrackerComponent, pathMatch: 'full' },
  // { path: 'expt-tracker', component: ExptTrackerComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/', pathMatch: 'full' }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      { enableTracing: false } // <-- true = debugging purposes
    )],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
