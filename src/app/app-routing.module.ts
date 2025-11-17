import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { AnimalCreateComponent } from './components/animal/animal-create/animal-create.component';
import { AnimalUpdateComponent } from "./components/animal/animal-update/animal-update.component";
import { AnimalDeleteComponent } from "./components/animal/animal-delete/animal-delete.component";
import { AnimalCrudComponent } from "./views/animal-crud/animal-crud.component";
import { LoginComponent } from "./views/login/login.component";
import { SobreComponent } from "./views/sobre/sobre.component";
import { MonitoramentoIotComponent } from "./views/monitoramento-iot/monitoramento-iot.component";
import { EstatisticasComponent } from "./views/estatisticas/estatisticas.component";
import { InteressadosComponent } from "./views/interessados/interessados.component";
import { AuthGuard } from "./guards/auth.guard";


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: AnimalCrudComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "animals",
    component: AnimalCrudComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "animals/create",
    component: AnimalCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "animals/update/:id",
    component: AnimalUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "animals/delete/:id",
    component: AnimalDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "monitoramento-iot",
    component: MonitoramentoIotComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "estatisticas",
    component: EstatisticasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interessados",
    component: InteressadosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "sobre",
    component: SobreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
