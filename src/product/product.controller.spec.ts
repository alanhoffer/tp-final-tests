import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  
  describe('findAll', () => {
    it('devuelve un arreglo de productos', () => {

      const products = [
        { id: 1, name: 'Producto 1', price: 10.99 },
        { id: 2, name: 'Producto 2', price: 20.99 },
      ];
      
      jest.spyOn(service, 'findAll').mockReturnValue(products);

      const result = controller.findAll();

      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('devuelve el producto según el ID proporcionado', () => {

      const product = { id: 1, name: 'Producto 1', price: 10.99 };

      jest.spyOn(service, 'findOne').mockReturnValue(product);

      const result = controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);

      expect(result).toEqual(product);
    });
  });

  describe('create', () => {
    it('crea y devuelve un nuevo producto', () => {

      jest.spyOn(service, 'create').mockImplementation((createProductDto) => {
        const createdProduct = { id: 1, ...createProductDto };
        return createdProduct;
      });

      const createProductDto: CreateProductDto = {
        id:1,
        name: 'Nuevo Producto',
        price: 9.99,
      };

      const result = controller.create(createProductDto);

      expect(service.create).toHaveBeenCalledWith(createProductDto);

      expect(result).toEqual({ id: 1, ...createProductDto });
    });
  });


  describe('update', () => {
    it('actualiza y devuelve el producto actualizado', () => {
      
      const updateProductDto: UpdateProductDto = {
        id:1,
        name: 'Producto Actualizado',
        price: 19.99,
      };

      jest.spyOn(service, 'update').mockImplementation(() => 
        updateProductDto
      );


      const result = controller.update('1', updateProductDto);

      expect(service.update).toHaveBeenCalledWith(1, updateProductDto);

      expect(result).toEqual({ id: 1, ...updateProductDto });
    });
  });

  describe('remove', () => {
    it('elimina y devuelve el producto eliminado', () => {

      const product = { id: 1, name: 'Producto 1', price: 10.99 };
      jest.spyOn(service, 'remove').mockReturnValue(product);

      const result = controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);

      expect(result).toEqual(product);
    });
  });
});
