import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Product } from './products.entity';
import * as data from '../../data.json';

@Injectable()
export class DataLoadService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async load() {
    const categoryEntities = [];
    for (const categoryData of data.categories) {
      let category = await this.categoryRepository.findOneBy({
        name: categoryData.name,
      });
      if (!category) {
        category = this.categoryRepository.create(categoryData);
        categoryEntities.push(await this.categoryRepository.save(category));
      } else {
        categoryEntities.push(category);
      }
    }

    for (const productData of data.products) {
      const category = categoryEntities.find(
        (cat) => cat.name === productData.category,
      );
      if (category) {
        let product = await this.productRepository.findOneBy({
          name: productData.name,
        });
        if (!product) {
          product = this.productRepository.create({
            ...productData,
            category: category,
          });
          await this.productRepository.save(product);
        }
      }
    }
  }
}
