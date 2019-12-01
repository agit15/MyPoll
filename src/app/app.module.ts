import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule, MatListModule, MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityComponent } from './security/security/security.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security/security.interceptor';
import { SecurityModule } from './security/security.module';
import { AuthGuard } from './security/guards/auth.guard';
import { RegistrerenComponent } from './security/registreren/registreren.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { PollFormComponent } from './poll-form/poll-form.component';
import { PollForm2Component } from './poll-form2/poll-form2.component';
import { PollStemmenComponent } from './poll-stemmen/poll-stemmen.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';

const appRoutes: Routes = [
  {path: '', component: SecurityComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'pollForm', component: PollFormComponent, canActivate: [AuthGuard]},
  {path: 'pollForm2', component: PollForm2Component, canActivate: [AuthGuard]},
  {path: 'pollStemmen', component: PollStemmenComponent, canActivate: [AuthGuard]},
  {path: 'pollDetail', component: PollDetailComponent, canActivate: [AuthGuard]},
  {path: 'registreren', component: RegistrerenComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PollFormComponent,
    PollForm2Component,
    PollStemmenComponent,
    PollDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    SecurityModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: 
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
