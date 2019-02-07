import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { OrderPage } from '../order/order';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItems: any = [];
  total: any;
  ntotal: any;
  showEmptyCartMessage: boolean = false;
  itemDelete: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController) {
    this.total = 0.0;
    this.ntotal = 0.0;
    this.storage.get("cart").then((data) => {
      this.cartItems = data;
      console.log(this.cartItems);

      if(this.cartItems != null)
      {
        this.cartItems.forEach((item, i) => {
          this.total = this.total + (item.amount)
        })  
        
      }
      else
      this.showEmptyCartMessage = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    console.log(this.cartItems);
  }

  removeFromCart(item, i) {
    let price = item.product.price;
    let qty = item.product.qty;
    this.cartItems.splice(i, 1);
    this.storage.set("cart", this.cartItems).then(() => {
      this.total = parseFloat(this.total) - (price * qty);
      console.log(this.total);
    });
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
  checkOut() {

    this.storage.get("cart").then((data) => {
      this.cartItems = data;
      console.log(this.cartItems);
      console.log(this.ntotal);
    });

    if (this.cartItems.length > 0) {
      this.cartItems.forEach((item, i) => this.ntotal = this.ntotal + ((item.product.price) * (item.qty)))
      let prompt = this.alertCtrl.create({
        title: 'Proceed to Checkout',
        buttons: [
          {
            text: 'Back',
            handler: () => {
              console.log('Back clicked');
            }
          },
          {
            text: 'Proceed',
            handler: () => {
              this.navCtrl.setRoot(OrderPage);
              // this.navCtrl.push(OrderPage,{ namount : this.ntotal } );
              console.log('Proceed clicked');
            }
          }
        ]
      });
      prompt.present();
    }

  }



}
