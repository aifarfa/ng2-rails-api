import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';

const routes = [
  { path: '', component: ProductComponent },
  { path: 'products', component: ProductComponent }
]

export const appRoutes = RouterModule.forRoot(routes);
