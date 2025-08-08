import Image from "next/image";

import { Header } from "@/components/common/header";
import ProductsList from "@/components/common/productsList";
import { db } from "@/db";

const Home = async () => {
  const products = await db.query.productTable.findMany(
    {
      with: {
        variants: true,
        category: true,
      },
    }
  );

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

        <ProductsList title="Produtos" products={products} />

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
      </div>
      </>
  );
};

export default Home;
