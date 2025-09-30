import { PopulatedCartItemDTO } from '@/types/cart'
import React from 'react'


interface OrderItemsPage {
    cartItems:PopulatedCartItemDTO[]
}
const OrderItems:React.FC<OrderItemsPage> = ({cartItems}) => {
  return (
    <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Items Ordered
          </h2>
          <div className="overflow-x-auto">
            <ul className="divide-y divide-gray-200 text-sm">
              {Array.isArray(cartItems) &&
               cartItems.length > 0 &&
                cartItems.map((item, key) => (
                  <li
                    className="flex justify-between py-3 sm:text-base"
                    key={key}
                  >
                  
                    <span className="pr-2">
                      {item.productId.productName} ({item.variant.weight}g) ×{" "}
                      {item.quantity}
                    </span>
                    <span className="font-medium whitespace-nowrap">
                      ₹{item.subtotal}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
  )
}

export default OrderItems