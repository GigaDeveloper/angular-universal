import {NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'gs-first-app'
    }),
    BrowserTransferStateModule,
    AppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class BrowserAppModule { }
