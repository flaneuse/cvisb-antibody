import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatTabsModule, MatButtonModule
  // MatAutocompleteModule, MatFormFieldModule, MatInputModule,
  // MatChipsModule, MatTabsModule, MatTableModule, MatSelectModule,
  // MatCheckboxModule, MatIconModule, MatSortModule, MatButtonModule,
  // MatSnackBarModule, MatPaginatorModule, MatExpansionModule,
  // MatDatepickerModule, MatNativeDateModule, MatDividerModule,
  // MatCardModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatTabsModule, MatButtonModule
    // MatAutocompleteModule, MatFormFieldModule, MatInputModule,
    // MatChipsModule, MatTabsModule, MatTableModule, MatSelectModule,
    // MatCheckboxModule, MatIconModule, MatSortModule, MatButtonModule,
    // MatSnackBarModule, MatPaginatorModule, MatExpansionModule,
    // MatDatepickerModule, MatNativeDateModule, MatDividerModule,
    // MatCardModule, MatTooltipModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatTabsModule, MatButtonModule
    // MatAutocompleteModule, MatFormFieldModule, MatInputModule,
    // MatChipsModule, MatTabsModule, MatTableModule, MatSelectModule,
    // MatCheckboxModule, MatIconModule, MatSortModule, MatButtonModule,
    // MatSnackBarModule, MatPaginatorModule, MatExpansionModule,
    // MatDatepickerModule, MatNativeDateModule, MatDividerModule,
    // MatCardModule, MatTooltipModule
  ],
})
export class MaterialModule { }
