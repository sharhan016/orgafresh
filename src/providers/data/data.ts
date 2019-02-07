import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Data {

  public items_all: any = []; // full list
  //public items: any = [] // items from the subcategory
  public list : any[] = [];
  public items2: any;

  private subcategory;

  constructor(public http: HttpClient) {
    
    this.load();
  
    console.log('Hello DataProvider Provider');
  }

  items () {
    return this.items_all.filter(i => Number(i.sub_category) === Number(this.subcategory));
  }
  setSubcategory (subcategory) {
    this.subcategory = subcategory;
  }

  load(){
    this.http.get('http://market.orgafreshonline.in/api/fooditem')
    .map(res => res)
    .subscribe(data => {
      this.items_all = data; 
    });
    
    
  }

  filterItems(searchTerm){
    if(!searchTerm){
      return [];
    } else{

      return this.items_all.filter((item) => {
        return item && item.name && item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });     
    }
  }
}