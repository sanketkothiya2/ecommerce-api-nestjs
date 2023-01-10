import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from '../dtos/product.dto';
import { FilterProductDTO } from '../dtos/filter-product.dto';


@Controller('store/products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(filterProductDTO);
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Post('/')
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.addProduct(createProductDTO);
    return product;
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.updateProduct(id, createProductDTO);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }

  @Get('fav-movies')
  @UseGuards(JwtAuthGuard)
  async movies(@Req() req) {
    return ['Avatar', 'Avengers'];
  }

}