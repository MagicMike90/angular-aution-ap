import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Product } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.tokens';
import { MediaObserver } from '@angular/flex-layout';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {
  @Input() products: Product[];
  readonly columns$: Observable<number>;
  changeDetection: ChangeDetectionStrategy.OnPush;
  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 3],
    ['lg', 4],
    ['xl', 5]
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
