import { useQuery } from "@tanstack/react-query"
import { ShoppingBasketIcon } from "lucide-react" 
import Image from "next/image"

import { getCart } from "@/actions/get-cart"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle,SheetTrigger } from "@/components/ui/sheet"
import { formatCentsToBRL } from "@/helpers/money"

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


        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full flex-col max-h-full gap-5 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col">
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
        
            </ScrollArea>
          </div>
          {cart?.items.length && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator/>

              <div className="flex items-center justify-between text-sm font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator/>
              <div className="flex items-center justify-between text-sm font-medium">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator/>
              <div className="flex items-center justify-between text-sm font-medium">
                <p>Total</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>
              <Button className="rounded-full mt-5">Finalizar compra</Button>
            </div>
          )}
        </div>
        
     
    </SheetContent>
  </Sheet>  
  )
}


export default Cart;