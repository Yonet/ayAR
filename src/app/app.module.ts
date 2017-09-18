import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArComponent } from './ar/ar.component';
import { PatternMarkerComponent } from './pattern-marker/pattern-marker.component';

import { ArService } from './ar.service';

@NgModule({
  declarations: [
    AppComponent,
    ArComponent,
    PatternMarkerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ArService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
