import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Producto 1', price: 10.99 },
    { id: 2, name: 'Producto 2', price: 20.99 },
    { id: 3, name: 'Producto 3', price: 15.99 },
    { id: 4, name: 'Producto 4', price: 8.99 },
    { id: 5, name: 'Producto 5', price: 12.99 }];


  loadProduct(productArray: Product[]) {
    this.products = productArray;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      return null
    }
    return product;
  }

  create(createProductDto: CreateProductDto) {
    try {
      const product = this.products.some(product => product.id === createProductDto.id)
      if (product) {
        throw "Error: el producto con ese id ya existe";
      }
      this.products.push(createProductDto);
      return createProductDto;
    }
    catch {
      return null;

    }
  }

  update(id: number, updateProductDto: UpdateProductDto):Product {

    try {
      const index = this.products.findIndex(product => product.id == id);
      if (index == -1) {
        throw "Error: el producto con ese id no existe";
      }      
      const updatedProduct:Product = { ...this.products[index], ...updateProductDto };
      this.products[index] = updatedProduct;
      return updatedProduct;
    }
    catch {
      return null;

    }

  }

  remove(id: number) {

    try {
      const index = this.products.findIndex(product => product.id === id);
      const product = this.products.find(product => product.id === id);
      if (index == -1) {
        throw "Error: el producto con ese id no existe";
      }
      this.products = this.products.filter(product => product.id != id);

      return product;
    }
    catch {
      return null;

    }

  }

}
