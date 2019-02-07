import { Component } from '@angular/core';
import { Platform, NavController, ToastController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { Data } from "../../providers/data/data";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public fooditems: any = [];
  public searchedItem = [];
  public product = [];
  public searchTerm: string = '';
  searchControl: FormControl;

  public items = [];
  searching: any = false;

  public slideImages: any[] = [{ id: 0, image: '', created_at: '', updated_at: '' }];

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public splashScreen: SplashScreen,
    public data: Data,
    public http: Http) {
    
    this.searchControl = new FormControl();
    this.load();
    this.loadSlideimages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.setFilteredItems();
    });
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
  onSearchInput() {
    //    this.searching = true;
  }
  async setFilteredItems() {
    const items = await this.data.filterItems(this.searchTerm);
    console.log(items);
    this.items = items;
  }
  loadSlideimages() {
    this.http.get('http://market.orgafreshonline.in/api/slideimage')
      .map((res) => res.json())
      .subscribe((data) => {
        this.slideImages = data;
        console.log(this.slideImages);
      }, (err) => {
        console.log('error: ' + err);
      })
  }

  load() {
    this.http.get('http://market.orgafreshonline.in/api/foodtype')
      .map(res => res.json())
      .subscribe(data => {
        this.fooditems = data;
        console.log(this.fooditems);
        // this.loader.dismiss();
      }, (err) => {
        console.log('error:' + err);
      });
  }

  openPage(item) {
    this.product = item;
    console.log(item);
    this.navCtrl.push('CategoryPage',this.product);   // here the foodtype goes to category page.....product id is being used in the category page
  
  }

  searchItem(item){
    this.searchedItem = item;
    console.log(item);
    this.navCtrl.push('SearchPage',this.searchedItem);
  }

}
