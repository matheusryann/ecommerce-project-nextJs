import Link from "next/link";

import { Button } from "@/components/ui/button";
import { categoryTable } from "@/db/schema";


interface CategorySelectorProps {
    categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
    
    return (
        <div className="rounded-b-3xl P-6 bg-{#F4EFFF}">
            <div className="grid grid-cols-2 gap-3">
                {categories.map((category) =>
                (
                <Button key={category.id} variant="ghost" className="w-full bg-white font-semibold text-xs">
                    <Link href={`/category/${category.slug}`}>
                    {category.name}
                    </Link>
                </Button>
                ))} 
            </div>
        </div>
    );
};

export default CategorySelector;