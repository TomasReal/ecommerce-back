import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(): Promise<Product[]> {
    return this.productsRepository.getProducts();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async addProduct(createProductDto: CreateProductDto): Promise<string> {
    try {
      await this.productsRepository.addProduct(createProductDto);
      return 'New product added successfully';
    } catch (error) {
      throw new Error('Error adding new product');
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const updatedProduct = { ...product, ...updateProductDto };
    return this.productsRepository.updateProduct(updatedProduct);
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    const product = await this.productsRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productsRepository.deleteProduct(id);
    return { message: 'Product deleted successfully' };
  }
}
