import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  loader: any = this.loadingCtrl.create({ content: "Please wait..." });
  public items : any[] = [];
  public category = [];
  public title : string;
  
  constructor(
    public navCtrl: NavController, 
    public http: Http,
    public navParams: NavParams,
    public alertCtrl : AlertController,
    
    public loadingCtrl: LoadingController,) 
    {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
    console.log('id.....',this.navParams.get('id'));
    this.title=this.navParams.get('name');
  }
  ionViewWillEnter(){
    this.presentLoading();
    this.load();
    }

    presentLoading(){
      this.loader.present();
    }

  load(){
    this.http.get('http://market.orgafreshonline.in/api/subcategory?type='+this.navParams.get('id'))
    .map(res => res.json())
    .subscribe(data => {
      this.items=data;
      this.loader.dismiss();
      console.log(this.items);
    });
  }

  openPage(item) {
    this.category = item;
    console.log(item);
    this.navCtrl.push('TypeDetailPage',this.category);
  }

}
