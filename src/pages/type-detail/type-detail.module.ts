import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TypeDetailPage } from './type-detail';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    TypeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TypeDetailPage),
   PipesModule
  ],
})
export class TypeDetailPageModule {}
