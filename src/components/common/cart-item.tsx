import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";



interface CartItemProps {
    id: string;
    productName: string;
    productVariantImageUrl: string;
    productVariantName: string;
    productVariantPriceInCents: number;
    quantity: number;
}


const CartItem = ({
    id, 
    productName, 
    productVariantImageUrl, 
    productVariantName, 
    productVariantPriceInCents, 
    quantity,

}: CartItemProps) => { 

    return (
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Image
            src={productVariantImageUrl}
            alt={productVariantName}
            width={78}
            height={78}
            />
            <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{productName}</p>
                <p className="text-muted-foreground text-xs font-medium">{productVariantName}</p>
                <div className="flex items-center border justify-between rounded-lg w-[100px]">
                <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
                    <MinusIcon/>
                </Button>
                <p>{quantity}</p>
                <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
                    <PlusIcon/>
                </Button>
            </div>	
            </div>
         </div>
        </div>
    )
}

export default CartItem;