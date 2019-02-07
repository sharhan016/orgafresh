import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import 'rxjs/add/operator/map'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OrderPage } from '../pages/order/order';
import { CartPage } from '../pages/cart/cart';
import { PipesModule } from "../pipes/pipes.module";
import { Data } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OrderPage,
    CartPage,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    // IonicModule.forRoot({
    //   mode: 'ios',
    //   menuType: 'overlay'
    // }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OrderPage,
    CartPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
    ]
})
export class AppModule {}
