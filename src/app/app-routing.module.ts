import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home/:tipo_usu/:id',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list/:tipo_usu/:id',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'resgistrar', loadChildren: './resgistrar/resgistrar.module#ResgistrarPageModule' },
  { path: 'creditos', loadChildren: './creditos/creditos.module#CreditosPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'modificar/:tipo_usu/:id', loadChildren: './modificar/modificar.module#ModificarPageModule' },
  { path: 'modificarformulario/:tipo_usu/:id/:idconsultar', loadChildren: './modificarformulario/modificarformulario.module#ModificarformularioPageModule' },
  { path: 'nosotros', loadChildren: './nosotros/nosotros.module#NosotrosPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
