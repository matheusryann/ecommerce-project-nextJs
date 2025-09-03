import { MinusIcon, PlusIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";


interface CartItemProps {
    id: string;
    productName: string;
    productVariantId: string;
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
    productVariantId,
    productVariantPriceInCents, 
    quantity,

}: CartItemProps) => { 

    const removeProductFromCartMutation = useRemoveProductFromCart(id);
    const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);
    const increaseCartProductQuantityMutation = useIncreaseCartProduct(productVariantId);

    const handleDeleteClick = () => {
        removeProductFromCartMutation.mutate(undefined, {
          onSuccess: () => {
            toast.success("Produto removido do carrinho.");
          },
          onError: () => {
            toast.error("Erro ao remover produto do carrinho.");
          },
        });
      };

      const handleDecreaseClick = () => {
        decreaseCartProductQuantityMutation.mutate(undefined, {
          onSuccess: () => {
            toast.success("Quantidade do produto diminuida.");
          },
          onError: () => {
            toast.error("Erro ao diminuir quantidade do produto.");
          },
        });
      };

      const handleIncreaseClick = () => {
        decreaseCartProductQuantityMutation.mutate(undefined, {
          onSuccess: () => {
            toast.success("Quantidade do produto aumentada.");
          },
          onError: () => {
            toast.error("Erro ao aumentar quantidade do produto.");
          },
        });
      };

    return (
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Image
            src={productVariantImageUrl}
            alt={productVariantName}
            width={78}
            height={78}
            className="rounded-lg"
            />
            <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{productName}</p>
                <p className="text-muted-foreground text-xs font-medium">{productVariantName}</p>
                <div className="flex items-center border justify-between rounded-lg w-[100px] p-1">
                <Button className="h-4 w-4" variant="ghost" onClick={handleDecreaseClick}>
                    <MinusIcon size={12}/>
                </Button>
                <p className="text-xs font-medium">{quantity}</p>
                <Button className="h-4 w-4" variant="ghost" onClick={handleIncreaseClick}>
                    <PlusIcon size={12}/>
                </Button>
            </div>	
            </div>
         </div>
         <div className="flex flex-col justify-center gap-1 items-end">
         <Button variant="outline" size="icon" onClick={handleDeleteClick}>
            <TrashIcon size={12}/>
         </Button>
         <p className="text-sm font-semibold">{formatCentsToBRL(productVariantPriceInCents)}</p>
         </div>
        </div>
    )
}

export default CartItem;