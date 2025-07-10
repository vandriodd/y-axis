import { Button } from './ui/button';

interface ProductLandingCardProps {
  img: string;
  name: string;
  description: string;
}

export default function ProductLandingCard({ img, name, description }: ProductLandingCardProps) {
  return (
    <article className="max-w-sm bg-bg-secondary border-gold/30 border-[0.5px]">
      <a href="#">
        <img className="border-b-gold/30 border-b-[0.5px]" src={img} alt={`Product ${name} image`} />
      </a>
      <div className="flex flex-col items-start h-60 p-6">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight font-garamond">
            {name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-foreground">
          {description}
        </p>

        <Button>Order Now</Button>
      </div>
    </article>
  );
}
