import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import {Data} from '../../providers/data';
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
                    var offer: any;
                    for (offer of data) {
                        this.offers.push({image: offer.image, title: offer.title, text: offer.subtitle, description: offer.description});
                    }
                  },
                  error => {
                      console.log(error)
                      this.showConectionErrAlert();
                  });
  }  


  pullRefresh(refresher) {
     this.http.get(this.feedUrl + this.account)
              .map(res => res.json())
              .subscribe(
                  data => {
                    setTimeout(() => {
                        refresher.complete();
                        var offer: any;
                        for (offer of data) {
                            this.offers.push({image: offer.image, title: offer.title, text: offer.subtitle, description: offer.description});
                        }
                        this.presentToast('Offers updated', 'top');
                    }, 2000);
                  },
                  error => {
                    setTimeout(() => {
                        this.showConectionErrAlert();
                        refresher.complete();
                    }, 2000);
                  });
  }

   viewOffer(event, offer) {

     this.navCtrl.push(OfferPage, {
         offer : offer
     });
  }

  
  showConectionErrAlert() {
      let alert = this.alertCtrl.create({
        title: 'Oh bother!!',
        subTitle: 'Connection to latest data is unavailable.',
        buttons: ['FAIR ENOUGH']
      });
      alert.present();
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
