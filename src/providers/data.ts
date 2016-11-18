import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class Data {

  formattedFeed: any;

  constructor() {}

  formatFeed(data): any {
        this.formattedFeed = []; // Reset so as not to duplicate list
        var offer: any;
        for (offer of data) {
            this.formattedFeed.push({
                id: offer.id,
                image: offer.image, 
                title: offer.title, 
                subtitle: offer.subtitle, 
                description: this.formatDescription(offer.description), 
                adtype: this.formatAdtype(offer.adtype, offer.voucher), 
                daysleft: this.formatDaysLeft(offer.enddate), 
                voucher: offer.voucher, 
                voucherurl: offer.voucherurl, 
                adStatus: offer.adStatus
            });
        }
        return this.formattedFeed;
  }

  formatDaysLeft(enddate): any {
      var dayslefttext = '';
      if(!enddate){
				dayslefttext = 'No end date';
			} else {
          var datenow = new Date();
          var endDate = new Date(enddate*1000);
          var oneDay = 24*60*60*1000; 
          var daysleft = Math.round((endDate.getTime() - datenow.getTime())/(oneDay));
          if(daysleft<0){
              dayslefttext = 'Expired';
          } else {			
            switch(daysleft) {		
            case 0:
              dayslefttext = 'Ends today';
              break;
            case 1:
              dayslefttext = daysleft.toString() + ' day left';
              break;
            default:
              dayslefttext = daysleft.toString() + ' days left';
            }
        }
    }
    return dayslefttext;
  }

  formatAdtype(adtype, voucher): any {
    var adText = '';
    if (adtype == 'news') {
					adText = 'News'; 
    }
		if (adtype == 'instore') {
					adText = 'In-store offer'; 
    }
			
		if (adtype == 'online') {
			if ( !voucher ) {
					adText = 'Online offer'; 
        } else {
					adText = 'Online with code';
      }
    }
    return adText;
  }

  formatDescription(description): any {
			var desc = '';
			desc = description.replace(/[\\\n]+/g, '<br />');
      return desc;
  }


}
