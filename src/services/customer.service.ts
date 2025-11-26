import { ERROR_MESSAGES } from '../constants';
import { CartRepo, ProductRepo, OrderRepo, OrderItemRepo } from '../repositories';

export class CustomerService {
  // ADD TO CART
  static async addToCart(userId: string, payload: { productId: string; quantity: number }) {
    const productRepo = ProductRepo();
    const cartRepo = CartRepo();

    const product = await productRepo.findOne({ where: { id: payload.productId } });
    if (!product) throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

    if (payload.quantity > product.stock) throw new Error(ERROR_MESSAGES.STOCK_LOW);

    const existing = await cartRepo.findOne({
      where: { user: { id: userId }, product: { id: payload.productId } },
    });

    if (existing) {
      existing.quantity += payload.quantity;
      return await cartRepo.save(existing);
    }

    const cart = cartRepo.create({
      user: { id: userId },
      product,
      quantity: payload.quantity,
    });

    return await cartRepo.save(cart);
  }

  // GET CART
  static async getCart(userId: string) {
    const repo = CartRepo();
    return await repo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  // REMOVE CART ITEM
  static async removeCartItem(userId: string, cartItemId: string) {
    const repo = CartRepo();

    const item = await repo.findOne({
      where: { id: cartItemId, user: { id: userId } },
    });

    if (!item) throw new Error(ERROR_MESSAGES.CART_ITEM_NOT_FOUND);

    await repo.remove(item);
  }

  // CHECKOUT (simulate)

  static async checkout(userId: string) {
    const cartRepo = CartRepo();
    const productRepo = ProductRepo();
    const orderRepo = OrderRepo();
    const orderItemRepo = OrderItemRepo();

    const cart = await cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    if (cart.length === 0) throw new Error(ERROR_MESSAGES.CART_EMPTY);

    let totalAmount = 0;

    for (const item of cart) {
      if (item.quantity > item.product.stock)
        throw new Error(`Stock too low for product ${item.product.name}`);

      totalAmount += Number(item.product.price) * item.quantity;
    }

    // CREATE ORDER
    const order = orderRepo.create({
      user: { id: userId },
      totalAmount,
    });

    const savedOrder = await orderRepo.save(order);

    // CREATE ORDER ITEMS + REDUCE STOCK
    for (const item of cart) {
      const orderItem = orderItemRepo.create({
        order: savedOrder,
        product: item.product,
        quantity: item.quantity,
        price: Number(item.product.price), // ensure number
      });

      await orderItemRepo.save(orderItem);

      item.product.stock -= item.quantity;
      await productRepo.save(item.product);
    }

    // CLEAR CART
    await cartRepo.remove(cart);

    return savedOrder;
  }

  // PURCHASE HISTORY
  static async orderHistory(userId: string) {
    const repo = OrderRepo();

    return await repo.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }
}
