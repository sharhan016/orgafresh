import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  public items: any[]=[];

  constructor(public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams) {
    console.log(this.navParams.get('id'));
    this.load();
  }

  load(){
    this.http.get('http://market.orgafreshonline.in/api/fooditem?type='+this.navParams.get('id'))
    .map(res => res.json())
    .subscribe(data => {
      this.items=data;
      console.log(this.items);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

}
