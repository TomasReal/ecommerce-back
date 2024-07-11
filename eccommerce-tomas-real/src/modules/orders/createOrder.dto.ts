import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { PartialProductDto } from '../products/products.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../products/products.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PartialProductDto)
  @ApiProperty({
    description:
      'Array de productos incluidos en la orden, debe contener al menos un producto',
    example: [
      { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Product 1' },
    ],
    type: [Product],
  })
  products: PartialProductDto[];
}
