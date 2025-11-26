export const ROLE = {
  ADMIN: 'ADMIN',
  SELLER: 'SELLER',
  CUSTOMER: 'CUSTOMER',
} as const;

export const DASHBOARD_FILTERS = ['today', 'thisMonth', 'lastMonth', 'thisYear'] as const;

export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: 'Product not found',
  CATEGORY_NOT_FOUND: 'Category not found',
  CART_ITEM_NOT_FOUND: 'Cart item not found',
  EMAIL_EXISTS: 'Email already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED_ACTION: 'You are not allowed to perform this action',
  CART_EMPTY: 'Cart is empty',
  STOCK_LOW: 'Requested quantity exceeds stock',
  ROLE_NOT_FOUND: 'Role not found',
} as const;
