import { ProductRepo, CategoryRepo } from '../repositories';
import { User } from '../entities/user.entity';
import { ERROR_MESSAGES } from '../constants';

export class ProductService {
  // CREATE PRODUCT
  static async createProduct(payload: {
    name: string;
    description: string;
    price: string;
    stock: number;
    categoryId: string;
    seller: User;
    imageUrl?: string;
  }) {
    const productRepo = ProductRepo();
    const categoryRepo = CategoryRepo();

    const category = await categoryRepo.findOne({ where: { id: payload.categoryId } });
    if (!category) throw new Error(ERROR_MESSAGES.CATEGORY_NOT_FOUND);

    const product = productRepo.create({
      name: payload.name,
      description: payload.description,
      price: Number(payload.price),
      stock: payload.stock,
      category,
      seller: payload.seller,
      imageUrl: payload.imageUrl,
    });

    return await productRepo.save(product);
  }

  // UPDATE PRODUCT (only seller)
  static async updateProduct(sellerId: string, productId: string, updateData: any) {
    const repo = ProductRepo();

    const product = await repo.findOne({
      where: { id: productId },
      relations: ['seller'],
    });

    if (!product) throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

    if (product.seller.id !== sellerId) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED_ACTION);
    }

    Object.assign(product, updateData);

    return await repo.save(product);
  }

  // DELETE PRODUCT (only seller)
  static async deleteProduct(sellerId: string, productId: string) {
    const repo = ProductRepo();

    const product = await repo.findOne({
      where: { id: productId },
      relations: ['seller'],
    });

    if (!product) throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

    if (product.seller.id !== sellerId) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED_ACTION);
    }

    await repo.remove(product);
  }

  // LIST ALL PRODUCTS
  static async listProducts({ page = 1, limit = 20, category, search }: any) {
    const repo = ProductRepo();
    const qb = repo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.seller', 'seller')
      .leftJoinAndSelect('p.category', 'category');

    if (category) qb.andWhere('category.name = :category', { category });
    if (search) qb.andWhere('LOWER(p.name) LIKE :search', { search: `%${search.toLowerCase()}%` });

    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  // LIST ONLY SELLER'S PRODUCTS
  static async getSellerProducts(sellerId: string) {
    const repo = ProductRepo();

    return await repo.find({
      where: { seller: { id: sellerId } },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }
}
