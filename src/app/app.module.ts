import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { OfferPage } from '../pages/offer/offer';

import { Data } from '../providers/data';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    OfferPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    OfferPage
  ],
  providers: [Data]
})
export class AppModule {}
