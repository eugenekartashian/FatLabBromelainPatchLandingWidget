export function useLandingBuyAction() {
  return {
    handleBuyClick: async (): Promise<boolean> => true,
    canAddDirectly: true,
  };
}
