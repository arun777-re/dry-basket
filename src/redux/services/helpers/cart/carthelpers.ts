import { CartState, PopulatedCartItemDTO, PopulatedProductInfo, UpdateQtyDTO } from "@/types/cart";

export function saveGuestCart(items:PopulatedCartItemDTO[]){
    localStorage.setItem('guest_cart',JSON.stringify(items))
}

export function getGuestCart(){
    const saved = localStorage.getItem('guest_cart');
    return saved && (JSON.parse(saved) || []) as PopulatedCartItemDTO[]
}

const getId = (p: string | PopulatedProductInfo) => {
  if(!p) return "";
  return typeof p === "string" ? p : p._id;
};
// utility function for createcart reducer
export function createCart(state:CartState,payload:PopulatedCartItemDTO){
  // ignore blank dummy products
  if(!payload.productId || getId(payload.productId) === '' || !payload.variant || payload.variant.weight <= 0 || payload.quantity === 0) {
  console.warn("Ignoring invalid product in cart creation", payload);
    return
  };
   if (!state.cart?.data || !Array.isArray(state.cart?.data!.items)) {
        state.cart.data = {total:0,
          items:[],
        finalTotal:0,
      totalWeight:0};
      }

      // check if item already exists in cart
      const existingItem = state.cart.data && state.cart.data.items.find(
        (c:PopulatedCartItemDTO) => getId(c.productId) === getId(payload.productId)
      );

      // update qty if exists else add new item
      if (existingItem) {
        existingItem.quantity += payload.quantity;
      } else {
        state.cart.data && state.cart.data.items.push(payload);
      }
}

// function to update qty
export function updateqty(state:CartState,payload:UpdateQtyDTO){
   const existingItem = state.cart.data!.items.find(
        (c:PopulatedCartItemDTO) => getId(c.productId) === getId(payload.productId)
      );
      if (existingItem) {
        existingItem.quantity += payload.delta;
        if (existingItem.quantity <= 0) {
          // auto remove if qty goes to 0
          state.cart.data!.items = state.cart.data!.items.filter(
            (c:PopulatedCartItemDTO) => getId(c.productId) !== getId(payload.productId)
          );
        }
      }
}

// function to remove item from cart
export function removeitem(state:CartState,productId:string){
      state.cart.data!.items = state.cart.data!.items.filter(
        (item:PopulatedCartItemDTO) => item.productId._id !== productId
      );
}