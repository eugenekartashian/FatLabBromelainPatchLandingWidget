export const PRODUCT_ALIAS = 'medicube-age-r-booster-pro-ex';

export function useProductContext() {
  return { productStore: { currentProduct: { alias: PRODUCT_ALIAS } } };
}
