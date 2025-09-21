import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './guards/auth.service';
import { LandingModule } from './landing/landing.module';
import { AppService } from './services/app.service';
import { HttpRequestInterceptor } from './services/http-interceptor';
import { ModalService } from './shared/modal/modal.service';
import { ToasterService } from './shared/toastr/toaster.service';
import { EncDecData } from './utilities/enc.dec';
import { TreeComponentUtilityFunctions } from './utilities/tree-component-util';
import { ToastrModule } from 'ngx-toastr';
import { UtilityFunctions } from './utilities/utility-func';
import { EmptyStatePagesComponent } from './empty-state-pages/empty-state-pages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageListenerService } from './services/storage-listener.service';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    EmptyStatePagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    LandingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      // preventDuplicates: true,
    }),
    AgGridModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    HttpRequestInterceptor, EncDecData, StorageListenerService,
    AuthGuard, AuthService, TreeComponentUtilityFunctions, AppService, ToasterService, ModalService, UtilityFunctions, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
