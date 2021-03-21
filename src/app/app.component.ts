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
        anchorId: 'tour-start',
        content: 'Let\'s get started!',
        // placement: 'below',
        enableBackdrop: true,
        route: '/home',
        title: 'Welcome to Cockatoos',
        }, {
        anchorId: 'practice',
        content: 'Practice your speech here',
        // placement: 'below',
        enableBackdrop: true,
        route: '/practice',
        title: 'Step X: Practice',
        }]);
        this.tourService.start();
    }
    title = "Cockatoos";
}
