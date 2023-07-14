import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    service.loadProduct([
      { id: 1, name: 'Producto 1', price: 10.99 },
      { id: 2, name: 'Producto 2', price: 20.99 },
      { id: 3, name: 'Producto 3', price: 15.99 },
      { id: 4, name: 'Producto 4', price: 8.99 },
      { id: 5, name: 'Producto 5', price: 12.99 }])


  });

  it('findOne 3 should return product', () => {
    expect(service.findOne(3).id).toBe(3)
    expect(service.findOne(3).name).toBe("Producto 3")
    expect(service.findOne(3).price).toBe(15.99)
  })

  it('findOne 6 should return null', () => {
    expect(service.findOne(6)).toBe(null)
  })

  it('findAll should return product', () => {
    const product = { id: 1, name: 'Producto 1', price: 10.99 };

    expect(service.findAll()[0]).toEqual(product)
  })

  it('findAll should return products', () => {
    expect(service.findAll()[7]).toBeUndefined()
  })


  it('create should return the product', () => {
    const createProductDto: CreateProductDto = {
      id: 6,
      name: 'Nuevo Producto',
      price: 9.99,
    };
    expect(service.create(createProductDto)).toEqual(createProductDto)
  })

  it('create should return null', () => {

    expect(service.create({
      id: 1,
      name: 'Nuevo Producto',
      price: 9.99,
    })).toBeNull();
  })

  it('update should return product updated', () => {

    let result = service.update(1, { name: 'Actualizado Producto' });

    expect(result.id).toBe(1)
    expect(result.name).toBe('Actualizado Producto')
    expect(result.price).toBe(10.99)
  })

  it('update should return null', () => {

    expect(service.update(8, { name: 'Intentando xd' })).toBeNull()
  })


  it('remove should return all other products', () => {

    let result = service.remove(1);

    expect(result.id).toBe(1)
    expect(result.name).toBe('Producto 1')
    expect(result.price).toBe(10.99)
  })

  it('remove should return null', () => {

    expect(service.remove(8)).toBeNull()
  })





  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
