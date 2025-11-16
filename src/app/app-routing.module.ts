import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./views/home/home.component";
import { AnimalCreateComponent } from './components/animal/animal-create/animal-create.component';
import { AnimalUpdateComponent } from "./components/animal/animal-update/animal-update.component";
import { AnimalDeleteComponent } from "./components/animal/animal-delete/animal-delete.component";
import { AnimalCrudComponent } from "./views/animal-crud/animal-crud.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "animals",
    component: AnimalCrudComponent
  },
  {
    path: "animals/create",
    component: AnimalCreateComponent
  },
  {
    path: "animals/update/:id",
    component: AnimalUpdateComponent
  },
  {
    path: "animals/delete/:id",
    component: AnimalDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
