import { Controller, Get } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsService {
    constructor(private readonly productsService: ProductsService){}
    @Get()
    getProducts() {
        return this.producsService.getProducts();
    }
}