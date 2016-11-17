import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Data } from '../../providers/data';
import { OfferPage } from '../../pages/offer/offer';

@Component({
  selector: 'page-offerlist',
  templateUrl: 'offerlist.html'
})
export class Offerlist {

  offers: any;
  account: any;
  feedUrl: string;


  constructor(public navCtrl: NavController, public dataService: Data, private http: Http, public alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.account = '1';
    this.feedUrl = 'https://www.mi-app.co.uk/adbuilder/mi-app_feed.php?account=';
    this.offers = [];
    this.getOffers();
 }

  getOffers() {
     this.http.get(this.feedUrl + this.account)
              .map(res => res.json())
              .subscribe(
                  data => {
                      this.offers = this.dataService.formatFeed(data);
                  },
                  error => {
                      this.presentToast('Connection not available', 'middle');
                  });
  }  


  pullRefresh(refresher) {
     this.http.get(this.feedUrl + this.account)
              .map(res => res.json())
              .subscribe(
                  data => {
                    setTimeout(() => {
                        refresher.complete();
                        this.offers = this.dataService.formatFeed(data);
                        this.presentToast('Offers updated', 'top');
                    }, 2000);
                  },
                  error => {
                    setTimeout(() => {
                        this.presentToast('Connection not available', 'middle');
                        refresher.complete();
                    }, 2000);
                  });
  }

   viewOffer(event, offer) {

     this.navCtrl.push(OfferPage, {
         offer : offer
     });
  }

  presentToast(message, position) {
    let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: position
    });

    toast.present();
}

}
