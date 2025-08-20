import { ShoppingBasketIcon } from "lucide-react" 

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const Cart = () => { 
  return (
  <Sheet>
    <SheetTrigger asChild>
    <Button variant="outline" asChild size="icon">
                    <ShoppingBasketIcon/>
                </Button>
    </SheetTrigger>

    <SheetContent>

    </SheetContent>
  </Sheet>  
  )
}


export default Cart;