import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
