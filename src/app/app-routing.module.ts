import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PracticeContainerComponent } from "@components/practice-container/practice-container.component";
import { ScoreChartsContainerComponent } from "@components/score-charts-container/score-charts-container.component";

const routes: Routes = [
    { path: 'home', component: ScoreChartsContainerComponent },
    { path: 'practice', component: PracticeContainerComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
