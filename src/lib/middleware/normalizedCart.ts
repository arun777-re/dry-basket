import { CartItemOutgoingDTO, PopulatedCartItemDTO } from "@/types/cart";

export function mapPopulatedOurgoing(
  items: PopulatedCartItemDTO[]
): CartItemOutgoingDTO[] {
  return items.reduce<CartItemOutgoingDTO[]>((acc, i) => {
    // skip anything invalid
    if (!i || !i.productId) return acc;

    // handle string productId
    if (typeof i.productId === 'string') {
      acc.push({
        productId: i.productId,
        categoryOfProduct: i.categoryOfProduct,
        quantity: i.quantity,
        variant: i.variant,
        addedAtPrice: i.addedAtPrice
      });
      return acc;
    }

    // handle object productId
    if (i.productId && i.productId._id) {
      acc.push({
        productId: i.productId._id,
        categoryOfProduct: i.categoryOfProduct,
        quantity: i.quantity,
        variant: i.variant,
        addedAtPrice: i.addedAtPrice
      });
    }

    return acc;
  }, []);
}



