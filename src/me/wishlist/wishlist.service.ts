import { Injectable } from '@nestjs/common';
// import { CreateWishlistDto } from './dto/create-wishlist.dto';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  async create(): // createWishlistDto: CreateWishlistDto
  Promise<string> {
    return new Promise((resolve) => {
      resolve('This action adds a new wishlist');
    });
  }

  async findAll(): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns all wishlist`);
    });
  }

  async findOne(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action returns a #${id} wishlist`);
    });
  }

  async update(
    id: number,
    // updateWishlistDto: UpdateWishlistDto,
  ): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action updates a #${id} wishlist`);
    });
  }

  async remove(id: number): Promise<string> {
    return new Promise((resolve) => {
      resolve(`This action removes a #${id} wishlist`);
    });
  }
}
