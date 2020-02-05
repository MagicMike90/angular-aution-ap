import { Component, OnInit, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Product } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { MediaObserver } from '@angular/flex-layout';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-suggestion',
  templateUrl: './product-suggestion.component.html',
  styleUrls: ['./product-suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSuggestionComponent {
  @Input() products: Product[];
  readonly columns$: Observable<number>;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 2],
    ['sm', 3],
    ['md', 5],
    ['lg', 2],
    ['xl', 3]
  ]);

  constructor(@Inject(API_BASE_URL) private readonly baseUrl: string, private readonly media: MediaObserver) {
    this.columns$ = this.media.media$.pipe(
      map(mc => this.breakpointsToColumnsNumber.get(mc.mqAlias) as number),
      startWith(3)
    );
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageUrl}`;
  }
}
