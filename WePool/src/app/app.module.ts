import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './profile/survey-components/question-component/question-component.component';
import { SurveyComponent } from './profile/survey-components/survey/survey.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QuestionLoaderComponent } from './profile/survey-components/question-loader/question-loader.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CarpoolsComponent } from './carpools/carpools.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AdministrationComponent } from './administration/administration.component';
import { ModerationComponent } from './moderation/moderation.component';
import { LoginComponent } from './login/login.component';
import { MapPOCComponent } from './map-poc/map-poc.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { LocationAutocompleteComponent } from './location-autocomplete/location-autocomplete.component';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionLoaderComponent,
    SurveyComponent,
    CarpoolsComponent,
    HomeComponent,
    ProfileComponent,
    AdministrationComponent,
    ModerationComponent,
    LoginComponent,
    MapPOCComponent,
    LocationAutocompleteComponent,
    ToolbarComponent

  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
