import { desc } from "drizzle-orm";
import Image from "next/image";

import BrandPartners from "@/components/common/brand-partners";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductsList from "@/components/common/productsList";
import { db } from "@/db";
import { productTable } from "@/db/schema";


const Home = async () => {

  
  const products = await db.query.productTable.findMany(
    {
      with: {
        variants: true,
        category: true,
      },
    }
    
  );

  const newCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({})



  return (

      <>
      <Header />
      <div className="px-5 space-y-6">

       <div className="px-5">
       <Image
        src="/banner-01.png"
        alt="Leve uma vida com estilo"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
        />
       </div>

       <BrandPartners />

        <ProductsList title="Produtos" products={products} />

        <CategorySelector categories={categories} />

        <div className="px-5">
        <Image
        src="/banner-02.png"
        alt="Seja Autêntico"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
        />
        </div>

        <ProductsList title="Novos Produtos" products={newCreatedProducts}/>

        <Footer />
      </div>
      </>
  );
};

export default Home;
