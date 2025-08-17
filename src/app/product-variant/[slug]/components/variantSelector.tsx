

import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";


interface VariantSelectorProps {
    variants: (typeof productVariantTable.$inferSelect)[];
    selectedVariant: string;
}


const VariantSelector = ({variants, selectedVariant}: VariantSelectorProps) => { 

    return <div className="flex items-center gap-4">
        {variants.map(variant => (
         <Link href={`/product-variant/${variant.slug}`} key={variant.id} className={selectedVariant === variant.slug ? "border-solid border-2 border-primary rounded-3xl" : ""}>
            <Image width={68} height={68} src={variant.imageUrl} alt={variant.name}/>
         </Link>
        ))}

    </div>

}

export default VariantSelector;