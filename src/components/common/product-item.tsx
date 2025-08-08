import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatPrice } from "@/helpers/moeny";


interface ProductItemProps {
    product: typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[];
    };
}

const ProductItem = ({product}: ProductItemProps) => {
    const firstVariant = product.variants[0];
    return ( <Link href="/" className="flex flex-col gap-4">
    <Image src={firstVariant.imageUrl} alt={firstVariant.name} width={200} height={200} className="rounded-3xl" />
    <div className="flex max-w-[200px] flex-col gap-1">
<p className="truncate text-sm font-semibold">{product.name}</p>
<p className="truncate text-xs text-muted-foreground font-medium">{product.description}</p>
<p className="truncate text-xs font-semibold">
    {formatPrice(firstVariant.priceInCents)}
</p>
    </div>

    </Link>
    );
};

export default ProductItem;