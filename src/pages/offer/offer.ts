import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Offer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html'
})
export class OfferPage {

  offer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.offer = {image: '', title: '' , text: '', description: ''};
  }

  ionViewDidLoad() {
      this.offer = this.navParams.get('offer');
  }

}
