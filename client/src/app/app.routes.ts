import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'products', component: ProductComponent }
]

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
