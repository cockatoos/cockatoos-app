import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-container',
  templateUrl: './home-page-container.component.html',
  styleUrls: ['./home-page-container.component.sass']
})
export class HomePageContainerComponent {
  config: any;
  fullpageApi: any;

  constructor() {

    // for more details on config options please visit fullPage.js docs
    this.config = {

      // fullpage options
      licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
      menu: '#menu',

      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      afterLoad: (origin, destination, direction) => {
        console.log(origin.index);
      }
    };
  }

  getRef(fullPageRef): void {
    this.fullpageApi = fullPageRef;
  }

}
