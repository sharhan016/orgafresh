import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import 'rxjs/add/operator/map'

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public products : any = [];
  public title = [];
  public price : string;
  public offer_price : string;
  public bquantiy : string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public toastCtrl : ToastController,
              public alertCtrl : AlertController,
              public modalCtrl: ModalController,
              public storage : Storage ) {

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.products = this.navParams.data;
    console.log(this.products);
    
    this.title=this.products.name;
    console.log(this.title);
    this.price = this.products.price;
    console.log(this.price);
    
        
  }

  onClick(item){

    let product = item;
    let prompt = this.alertCtrl.create({
    title:'Add to Cart',
    inputs:[{ name: 'quantity', placeholder: 'Enter Quantity'}],
    buttons:[
      { text: 'Cancel', handler: val => { console.log('Cancel Clicked');} } 
      ,
      { text: 'Add ' , handler:val => {

        this.storage.get("cart").then((data) => {
            if(data==null || data.length==0){
              data=[];
              data.push({
                "product": product,
                 "qty": val.quantity,
                "amount": parseFloat(this.price)* parseFloat(val.quantity)});
              }
            else
          
            {
              let added = 0;
              for(let i=0; i<data.length; i++)
              {
                if(product.id==data[i].product.id)
                {
                  console.log('product is already added in the cart');
                  data[i].qty = parseInt(data[i].qty) + parseInt(val.quantity) ;
                  data[i].amount=(parseFloat(data[i].this.price) * parseFloat(val.quantity))+ data[i].amount;
                  added = 1;
                }
              }
              switch(added){

                case 1:
               console.log('case 1 executed');
                      break;
                case 0:
                data.push({
                      "product": product,
                       "qty": val.quantity,
                      "amount": parseFloat(this.price)* parseFloat(val.quantity)});
                      console.log('case 0 executed');
                      break;
              }
             }
            this.storage.set("cart",data).then(()=> {
              console.log('cart updated');
              console.log(data);
              this.toastCtrl.create({
                message: "Cart updated",
                duration: 3000}).present();
              })
            })
            }
        }]
        });
        prompt.present();

  }

  openCart(){
    this.modalCtrl.create(CartPage).present();
  }

}
