import { useQuery } from "@tanstack/react-query"
import { ShoppingBasketIcon } from "lucide-react" 

import { getCart } from "@/actions/get-cart"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle,SheetTrigger } from "@/components/ui/sheet"

import CartItem from "./cart-item";

const Cart = () => { 
  const {data:cart, isPending: cartIsLoading} = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  })
  return (
  <Sheet>
    <SheetTrigger asChild>
    <Button variant="outline" asChild size="icon">
                    <ShoppingBasketIcon/>
                </Button>
    </SheetTrigger>

    <SheetContent>
      <SheetHeader>
        <SheetTitle>
      Carrinho
        </SheetTitle>
      </SheetHeader>
      <div>
        {cartIsLoading && <div>Carregando...</div>}
        {cart?.items.map((item) => (
          <CartItem 
          key={item.id}
          id={item.id}
          productName={item.productVariant.product.name}
          productVariantImageUrl={item.productVariant.imageUrl}
          productVariantName={item.productVariant.name}
          productVariantPriceInCents={item.productVariant.priceInCents}
          quantity={item.quantity}
          />
        ))}
      </div>
    </SheetContent>
  </Sheet>  
  )
}


export default Cart;