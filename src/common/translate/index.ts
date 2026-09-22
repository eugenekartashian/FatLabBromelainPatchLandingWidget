import copy from '../../copy';

const GENERAL: Record<string, string> = {
  ADD_TO_CART_PRODUCT_CARD: 'Add to cart',
};

export function useTranslationOnPage(partition: 'landings' | 'general' = 'general') {
  const table = partition === 'general' ? GENERAL : copy;
  return (key = ''): string => (table[key] || GENERAL[key] || key).trim();
}
