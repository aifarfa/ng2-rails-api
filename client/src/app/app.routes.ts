import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'products', component: ProductComponent },
  { path: 'products/:id', component: ProductDetailComponent }
]

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
