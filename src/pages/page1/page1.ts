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
    this.account = '6';
    this.offers = [{title: 'January Sale', text: 'Is on now'}, {title: 'Easter Sale', text: 'Is on a bit later'}];
    this.getOffers();
 }

  getOffers() {
     this.http.get('http://portal.mi-app.co.uk/connection.php?account=6')
              .map(res => res.json())
              .subscribe(
                  data => {
                    console.log('Data: ' + data[0].title);
                    this.offers = [{title: data[0].title, text: data[0].description}];
                    //setTimeout(() => {
                     // this.offers = this.dataService.formatObservation(data.SiteRep.DV);
                      
                    //}, 1500);
                  },
                  error => {
                      console.log(error)
                      this.showConectionErrAlert();
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
