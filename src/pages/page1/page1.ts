import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import {Data} from '../../providers/data';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

	offers: any;
  account: any;


  constructor(public navCtrl: NavController, public dataService: Data, private http: Http, public alertCtrl: AlertController) {
    this.account = '1';
    this.offers = [];
    this.getOffers();
 }

  getOffers() {
     this.http.get('http://portal.mi-app.co.uk/connection.php?account=' + this.account)
              .map(res => res.json())
              .subscribe(
                  data => {
                    var offer: any;
                    for (offer of data) {
                        this.offers.push({image: offer.image, title: offer.title, text: offer.subtitle});
                    }
                  },
                  error => {
                      console.log(error)
                      this.showConectionErrAlert();
                  });
  }  


  pullRefresh(refresher) {
     this.offers = [];
     this.http.get('http://portal.mi-app.co.uk/connection.php?account=' + this.account)
              .map(res => res.json())
              .subscribe(
                  data => {
                    setTimeout(() => {
                        refresher.complete();
                        var offer: any;
                        for (offer of data) {
                            this.offers.push({image: offer.image, title: offer.title, text: offer.subtitle});
                        }
                    }, 2000);
                  },
                  error => {
                    setTimeout(() => {
                        this.showConectionErrAlert();
                        refresher.complete();
                    }, 2000);
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

}
