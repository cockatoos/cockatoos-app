import { TourService } from 'ngx-tour-md-menu';
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    constructor(public tourService: TourService) {
        this.tourService.initialize([{
            anchorId: 'accent-chart',
            content: 'Accent chart shows you your accent over time!',
            // placement: 'below',
            enableBackdrop: true,
            route: '/home',
            title: 'Welcome to Cockatoos!',
        }]);
        this.tourService.start();
    }
    title = "Cockatoos";
}
