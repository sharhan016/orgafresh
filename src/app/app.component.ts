import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { TypeDetailPage } from "../pages/type-detail/type-detail";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  //pages: Array<{ title: string, component:any }>;
  public items : any = [];
  pages: any[]=
  [
  {
    title:'',component:''
  },
  {
    title:'',subPages:[]
  }
  ];

  // Selected Side Menu
  selectedMenu: any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public http : Http,
    public menuCtrl: MenuController) {
    //this.initializeApp();
    this.getSideMenus();
    this.load();
    this.pages = [
      { title: 'Home' , component: HomePage},
      { title:'Categories' , component: '' }
    ];

  }
  load(){
    this.http.get('http://market.orgafreshonline.in/api/foodtype')
    .map(res => res.json())
    .subscribe(data => {
      this.items=data;
      this.pages[1].subPages  =  this.items;
     // this.loader.dismiss();
    });
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }

  
  getSideMenus() {
    return [{
      title: 'Home', component: 'HomePage'
    },
    {
      title: 'Categories',
      subPages: [{
        title: '',
        component: 'TypeDetailPage'
      }]
    }];
  }

  // openPage(page){
  //   this.nav.setRoot(page.component);
  // }
  openPage(page, index) {
    
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component) {
      this.nav.setRoot(page.component);
      this.menuCtrl.close();
    } else {
      if (this.selectedMenu) {
        console.log(page);
        this.nav.push('TypeDetailPage',page);
        this.menuCtrl.close();
        this.selectedMenu = 0;
      } else {
        this.selectedMenu = index;
      }
    }
  }


}

