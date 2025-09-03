"use client";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductsListProps {
    title: string;
    products: (typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[];
    })[];
}

const ProductsList = ({title, products}: ProductsListProps) => {
    return (
        <div >
            <h3 className="px-5 font-semibold">{title}	</h3>
            <div className="px-5 flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {products.map(product => <ProductItem product={product} key={product.id}  />)}
            </div>
        </div>
    );
};

export default ProductsList;