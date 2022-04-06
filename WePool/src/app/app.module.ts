import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-files/app.component';

import { ProfileComponent } from './profile/profile.component'; //Will change when previous pull request comes in
import { ToolbarComponent } from './toolbar/toolbar.component';

import { HttpClientModule } from '@angular/common/http';
import { AdministrationComponent, ModerationComponent, AddGroupComponent} from './moderation-files';
import { SurveyComponent, LocationAutocompleteComponent, QuestionComponent, QuestionLoaderComponent } from './profile';
import { MapPOCComponent, CarpoolsComponent, GroupInfoComponent } from './carpool-files';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './account-files';
import { MaterialModule } from './modules/material.module';
import { HomeComponent } from './home-files';
import { GroupRouterComponent } from './carpool-files/group-router/group-router.component';
import { GroupViewComponent } from './moderation-files/group-view/group-view.component';
import { ModComponent } from './mod/mod.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    CarpoolsComponent,
    HomeComponent,
    ProfileComponent,
    ModerationComponent,
    LoginComponent,
    MapPOCComponent,
    LocationAutocompleteComponent,
    ToolbarComponent,
    GroupInfoComponent,
    GroupRouterComponent,
    SurveyComponent,
    QuestionComponent,
    QuestionLoaderComponent,
    GroupViewComponent,
    AdministrationComponent,
    ModerationComponent,
    ModComponent,
    AddGroupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
