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

  describe('create', () => {
    it('crea y devuelve un nuevo producto correctamente', () => {
      // Mockear el método create del servicio
      jest.spyOn(service, 'create').mockImplementation((createProductDto) => {
        const createdProduct = { id: 1, ...createProductDto };
        return createdProduct;
      });

      // Datos de prueba para crear un producto
      const createProductDto: CreateProductDto = {
        id:1,
        name: 'Nuevo Producto',
        price: 9.99,
      };

      // Llamar al método create del controlador
      const result = controller.create(createProductDto);

      // Verificar que el método create del servicio fue llamado con los datos correctos
      expect(service.create).toHaveBeenCalledWith(createProductDto);

      // Verificar que el resultado es el producto creado
      expect(result).toEqual({ id: 1, ...createProductDto });
    });
  });

  describe('findAll', () => {
    it('devuelve un arreglo de productos correctamente', () => {
      // Mockear el método findAll del servicio
      const products = [
        { id: 1, name: 'Producto 1', price: 10.99 },
        { id: 2, name: 'Producto 2', price: 20.99 },
      ];
      jest.spyOn(service, 'findAll').mockReturnValue(products);

      // Llamar al método findAll del controlador
      const result = controller.findAll();

      // Verificar que el resultado es el arreglo de productos esperado
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('devuelve el producto correcto según el ID proporcionado', () => {
      // Mockear el método findOne del servicio
      const product = { id: 1, name: 'Producto 1', price: 10.99 };
      jest.spyOn(service, 'findOne').mockReturnValue(product);

      // Llamar al método findOne del controlador con un ID específico
      const result = controller.findOne('1');

      // Verificar que el método findOne del servicio fue llamado con el ID correcto
      expect(service.findOne).toHaveBeenCalledWith(1);

      // Verificar que el resultado es el producto esperado
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('actualiza y devuelve el producto actualizado correctamente', () => {
      // Mockear el método update del servicio
      jest.spyOn(service, 'update').mockImplementation((id, updateProductDto) => {
        const updatedProduct = { id, ...updateProductDto };
        return updatedProduct;
      });

      // Datos de prueba para actualizar un producto
      const updateProductDto: UpdateProductDto = {
        name: 'Producto Actualizado',
        price: 19.99,
      };

      // Llamar al método update del controlador con un ID específico
      const result = controller.update('1', updateProductDto);

      // Verificar que el método update del servicio fue llamado con los datos correctos
      expect(service.update).toHaveBeenCalledWith(1, updateProductDto);

      // Verificar que el resultado es el producto actualizado
      expect(result).toEqual({ id: 1, ...updateProductDto });
    });
  });

  describe('remove', () => {
    it('elimina y devuelve el producto eliminado correctamente', () => {
      // Mockear el método remove del servicio
      const product = { id: 1, name: 'Producto 1', price: 10.99 };
      jest.spyOn(service, 'remove').mockReturnValue(product);

      // Llamar al método remove del controlador con un ID específico
      const result = controller.remove('1');

      // Verificar que el método remove del servicio fue llamado con el ID correcto
      expect(service.remove).toHaveBeenCalledWith(1);

      // Verificar que el resultado es el producto eliminado
      expect(result).toEqual(product);
    });
  });
});
