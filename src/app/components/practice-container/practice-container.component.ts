import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnalyseDialogComponent } from '@components/analyse-dialog/analyse-dialog.component';
import { TEST_ARTICLE } from '@testing/testing-article-data';

@Component({
  selector: 'app-practice-container',
  templateUrl: './practice-container.component.html',
  styleUrls: ['./practice-container.component.sass']
})
export class PracticeContainerComponent implements OnInit {

  article = TEST_ARTICLE;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AnalyseDialogComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

}
