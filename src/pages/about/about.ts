import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
    
}
