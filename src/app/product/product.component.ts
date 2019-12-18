import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
  providers:[UserService]
})
export class ProductComponent implements OnInit {
  xyz:any[];
  prod:any[];
  prodname:string;
  constructor(private userService:UserService) { 
    this.userService.getProducts().subscribe(prod => {
  		this.prod = prod;
  	});
  }

  ngOnInit() {
  }

  findProduct(){

    this.userService.updateProduct(this.prodname);

  	this.userService.getProducts().subscribe(prod => {
    /*  this.xyz = [];
      for(let key in prod){
        var temp = []
        for (let index in prod[key].hints){
          temp.push(prod[key].hints[index].label);
        }
        this.xyz.push({
          "food": temp
        })
      }
      */this.prod = prod.hints[0].food.nutrients;
      console.log(prod);
    });

  }
}
