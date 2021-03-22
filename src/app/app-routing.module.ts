import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageContainerComponent } from "@components/home-page-container/home-page-container.component";
import { MainAppContainerComponent } from "@components/main-app-container/main-app-container.component";
import { PracticeContainerComponent } from "@components/practice-container/practice-container.component";
import { ScoreChartsContainerComponent } from "@components/score-charts-container/score-charts-container.component";

const routes: Routes = [
    { path: 'home', component: HomePageContainerComponent },
    { path: 'app', component: MainAppContainerComponent,
        children: [
            {
                path: 'scores',
                component: ScoreChartsContainerComponent,
            },
            {
                path: 'practice',
                component: PracticeContainerComponent,
            },
            {
                path: '', redirectTo: '/app/scores', pathMatch: 'full'
            }
        ], },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
