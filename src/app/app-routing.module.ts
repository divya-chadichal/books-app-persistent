
import { Routes, RouterModule } from '@angular/router';

const loginModule = () => import('./login/login.module').then(x => x.LoginModule);
const registerModule = () => import('./register/register.module').then(x => x.RegisterModule);
const homeModule = () => import('./home/home.module').then(x => x.HomeModule);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: loginModule
  },
  {
    path: 'register',
    loadChildren: registerModule
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: homeModule
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
