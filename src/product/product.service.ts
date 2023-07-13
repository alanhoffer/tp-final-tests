import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  private products = [
    { id: 1, name: 'Producto 1', price: 10.99 },
    { id: 2, name: 'Producto 2', price: 20.99 },
    { id: 3, name: 'Producto 3', price: 15.99 },
    { id: 4, name: 'Producto 4', price: 8.99 },
    { id: 5, name: 'Producto 5', price: 12.99 }];



  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find(product => product.id === id);
  }

  create(createProductDto: CreateProductDto) {
    this.products.push(createProductDto);
    return createProductDto;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = {...this.products[index], ...updateProductDto};
      return updateProductDto;
    }
    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      return this.products.splice(index, 1)[0];
    }
    return null;
  }
}
