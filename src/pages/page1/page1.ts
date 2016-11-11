import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Data} from '../../providers/data';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

	offers: any;
  constructor(public navCtrl: NavController) {
    this.offers = [{title: 'January Sale', text: 'Is on now'}, {title: 'Easter Sale', text: 'Is on a bit later'}];
  }

}
