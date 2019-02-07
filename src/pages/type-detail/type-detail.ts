import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController, AlertController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Data } from "../../providers/data/data";
import { CartPage } from '../cart/cart';
import 'rxjs/add/operator/map'


@IonicPage()
@Component({
  selector: 'page-type-detail',
  templateUrl: 'type-detail.html',
})
export class TypeDetailPage {
  loader: any = this.loadingCtrl.create({ content: "Please wait..." });
  public items : any[] = [];
  public title : string;
  public type : string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl : ToastController,
    public alertCtrl : AlertController,
    public http: Http,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public data: Data,
    public storage : Storage ) {
      console.log(this.navParams.get('id'));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeDetailPage');
    console.log(this.navParams.get('id'));
    this.title=this.navParams.get('name');
    this.data.setSubcategory(this.navParams.get('id'));
    this.items = this.data.items();
  }
  ionViewWillEnter(){
    //this.presentLoading();
    //this.load();
    //console.log(this.navParams.data.product);
    //console.log(this.navParams.data.product.id);
    }

    presentLoading(){
      this.loader.present();
    }

load(){
  /*
  this.http.get('http://market.orgafreshonline.in/api/fooditem?type='+this.navParams.get('id'))
  .map(res => res.json())
  .subscribe(data => {
    this.items=data;
    this.loader.dismiss();
    console.log(this.items);
  });
  */
}

clicked(item){
  console.log(item + 'clicked');
}

onLongPress(item)
{
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
                "amount": parseFloat(product.price)* parseFloat(val.quantity)});
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
                  data[i].amount=(parseFloat(data[i].product.price) * parseFloat(val.quantity))+ data[i].amount;
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
                      "amount": parseFloat(product.price)* parseFloat(val.quantity)});
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
