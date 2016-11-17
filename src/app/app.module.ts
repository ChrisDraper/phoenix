import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Offerlist } from '../pages/offerlist/offerlist';
import { About } from '../pages/about/about';
import { OfferPage } from '../pages/offer/offer';

import { Data } from '../providers/data';

@NgModule({
  declarations: [
    MyApp,
    Offerlist,
    About,
    OfferPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Offerlist,
    About,
    OfferPage
  ],
  providers: [Data]
})
export class AppModule {}
