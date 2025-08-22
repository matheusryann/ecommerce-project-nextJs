import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductsList from "@/components/common/productsList";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money"

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variantSelector";

interface ProductVariantPageProps {
    params: Promise<{
        slug: string;
    }>
}

const ProductVariantPage = async({params}: ProductVariantPageProps) => { 
    const {slug} = await params; 
    const productVariant = await db.query.productVariantTable.findFirst({
        where: eq(productTable.slug, slug),
        with: {
            product: {
                with: {
                    variants: true,
                },
            },
        },
    });
    if (!productVariant) {
        notFound();
    }
    const likelyProducts = await db.query.productTable.findMany({
        where: eq(productTable.categoryId, productVariant.product.categoryId),
        with: {
            variants: true,
        }
            });

    return ( <>
    <Header/>
    <div className="flex flex-col space-y-6">

        <div className="h-[308px] w-full relative">
        <Image
        src={productVariant.imageUrl}
        alt={productVariant.name}
        fill
        className="object-cover"
        />
        </div>

        <div className="px-5">
            <VariantSelector variants={productVariant.product.variants} selectedVariant={productVariant.slug}/>
        </div>
        <div className="px-5">
            <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
            <h3 className="text-muted-foreground text-sm">{productVariant.name}</h3>
            <h3 className="text-lg font-semibold">{formatCentsToBRL(productVariant.priceInCents)}</h3>
        </div>

        <ProductActions productVariantId={productVariant.id}/>


        <div className="px-5">
            <p className="text-shadow-amber-600">
                {productVariant.product.description}
            </p>
        </div>
        <ProductsList products={likelyProducts} title="Talvez você goste também"/>
   
    <Footer />
   
    </div>

    </>
)
}

export default ProductVariantPage; 

