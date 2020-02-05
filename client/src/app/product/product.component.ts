import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../shared/services';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  readonly product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.product$ = this.route.paramMap.pipe(
      map(params => parseInt(params.get('productId') || '', 10)),
      filter(productId => Boolean(productId)),
      switchMap(productId => this.productService.getById(productId))
    );
  }
}
