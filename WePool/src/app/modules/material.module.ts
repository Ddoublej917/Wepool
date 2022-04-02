import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatFormFieldModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTableModule
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTableModule
  ]
})
export class MaterialModule { }