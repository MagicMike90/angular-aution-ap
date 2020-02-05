import { Component, OnInit, OnChanges, SimpleChange, Input, Inject } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Product } from 'src/app/shared/services';
import { startWith } from 'rxjs/operators';
import { API_BASE_URL } from 'src/app/app.tokens';
import { BidService } from 'src/app/shared/services/bid.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  private readonly productChange$ = new Subject<Product>();
  latestBids$: Observable<number>;
  @Input() product: Product;

  constructor(@Inject(API_BASE_URL) private readonly baseUrl: string, private readonly bidService: BidService) {}

  ngOnInit() {
    this.latestBids$ = combineLatest(
      this.productChange$.pipe(startWith(this.product)),
      this.bidService.priceUpdates$.pipe(startWith(null)),
      (product, bid) => (bid && bid.productId === product.id ? bid.price : product.price)
    );
  }

  ngOnChanges({ product }: { product: SimpleChange }) {
    this.productChange$.next(product.currentValue);
  }

  placeBid(price: number) {
    this.bidService.placeBid(this.product.id, price);
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }
}
