export function paginate(items: any[], total: number, page: number, limit: number) {
  return {
    items,
    meta: {
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit)
    }
  };
}
