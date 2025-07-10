interface TestimonialCardProps {
  img: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export default function TestimonialCard({ img, name, role, company, quote }: TestimonialCardProps) {
  return (
    <article className="w-full flex flex-col justify-between gap-6 p-6 h-full">
      <p className="font-normal text-foreground text-xl italic text-center">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex flex-row items-center gap-4 justify-center">
        <img
          className="w-16 h-16 rounded-full aspect-square object-cover border-gold/30 border-[0.5px]"
          src={img}
          alt={name}
        />
        <div className="flex flex-col">
          <h5 className="text-[1.2rem] font-bold tracking-tight font-garamond">
            {name}
          </h5>
          <small className="text-gold uppercase text-[0.8rem]">
            {role}, {company}
          </small>
        </div>
      </div>
    </article>
  );
}
