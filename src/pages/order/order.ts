import { Component } from '@angular/core';
import { ViewController, AlertController, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage'
import {HomePage} from '../home/home';



@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  orderNowUrl: string = 'https://market.orgafreshonline.in/api/order';

  rootPage = HomePage;
  orderForm : FormGroup;
  cartItems: any[] = [];
  public product = [];
  public id = [];
  public name = [];
  todo :any = {
    name: '',
    mobile: '',
    alternate_mobile: '',
    address: '',
    pobox: '',
    city: '',
    state: '',
    district: '',
    product_id: ''
      };
    total: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl : AlertController,
    builder: FormBuilder,
    public viewCtrl: ViewController, 
    public http: Http, 
    public platform: Platform,
    private loadingCtrl: LoadingController, ) {

    this.storage.get("cart").then((data) => {
      this.cartItems = data;
      console.log(this.cartItems);
      this.id = [];
      this.name = [];
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.id.push(data[i].product.id);     // this contains the Id of the products in the cart
          this.name.push(data[i].product.name);  // this contains the name of the products in cart
        }
         
        this.todo.product_id = this.id; // This shoud put the id array into the todo.product_id array
        console.log('product Id:'+ this.todo.product_id);
        console.log('product Id:'+ this.name);
     }
    });
    this.orderForm = builder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      mobile: ['', [Validators.required, Validators.minLength(10) , Validators.maxLength(10)]], 
      alternate_mobile: ['', [Validators.required, Validators.minLength(10) , Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      pobox: ['', [Validators.required, Validators.minLength(6) , Validators.maxLength(6)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
      state: ['', [Validators.required, Validators.minLength(4)]],
      district: ['', [Validators.required, Validators.minLength(4)]],
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    console.log('loaded');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });
 // private orderNowUrl = API_URL + 'order';

  public orderNow() {
    var loader = this.loadingCtrl.create({ content: "Please wait..." });
    loader.present();
    var prompt = this.alertCtrl.create({
        title:'Order Placed',
        subTitle: 'Your Order has been placed',
        buttons:[{ 
          text: 'Ok', 
          handler: () => { 
            this.storage.clear();
            //this.platform.exitApp();
            this.navCtrl.setRoot(HomePage);
           // this.nav.setRoot(HomePage);
            //this.nav.popToRoot();
            // new root should be setted
           // this.app.getRootNav().setRoot(HomePage);  //this gives a deprecated messsage  
            // this.nav.setRoot(HomePage);
           // this.navCtrl.popToRoot();

            //this.navCtrl.goToRoot();
           
          }
        }] 
      });
    this.todo.product_id = JSON.stringify(this.todo.product_id).replace(/ /g,'');
    console.log(this.todo);
    this.http.post(this.orderNowUrl, { data: this.todo }, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.log('Server response', response.text());
        loader.dismiss();
        prompt.present();
      })
      .catch(() => {
        loader.dismiss();
        this.handleError;
      }); 
    }

    private handleError(error: any): Promise<any> {
      console.error('This is the error:', error);                                                  
      return Promise.reject(error.message || error);
    }

}
