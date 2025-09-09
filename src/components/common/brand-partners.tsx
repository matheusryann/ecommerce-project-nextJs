import Image from "next/image";

const BRANDS = [
  { name: "Nike", logo: "/nike.svg" },
  { name: "Adidas", logo: "/adidas.svg" },
  { name: "Puma", logo: "/puma.svg" },
  { name: "New Balance", logo: "/new-balance.svg" },
  { name: "Vans", logo: "/vans-logo.svg" },
  { name: "Under Armour", logo: "/Under_armour_logo.svg" },
];

function Card({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 w-44 md:w-56">
      <div className="w-44 h-28 md:w-56 md:h-40 rounded-2xl  p-4 md:p-6 flex items-center justify-center">
        <Image
          src={logo}
          alt={name}
          width={120}
          height={120}
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />
      </div>
      <p className="mt-2 h-5 md:h-6 text-center text-sm md:text-base font-medium whitespace-nowrap truncate">
        {name}
      </p>
    </div>
  );
}

export default function BrandPartners() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Marcas Parceiras</h2>

      {/* Altura fixa simples para evitar sobreposição no mobile */}
      <div className="marquee h-[140px] md:h-[190px]">
        {/* Trilho 1 */}
        <div className="marquee-track">
          {BRANDS.map((b) => <Card key={b.name} {...b} />)}
        </div>
        {/* Trilho 2 (cópia) */}
        <div className="marquee-track marquee-track--alt" aria-hidden>
          {BRANDS.map((b) => <Card key={`${b.name}-alt`} {...b} />)}
        </div>
      </div>
    </section>
  );
}
