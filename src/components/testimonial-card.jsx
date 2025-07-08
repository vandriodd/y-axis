export default function TestimonialCard({ img, name, role, company, quote }) {
  return (
    <article className="bg-[var(--secondary-bg)] border-[var(--gray)] border-[0.5px] rounded-2xl w-[360px] h-[360px] flex flex-col justify-between p-8">
      <p className="mb-3 font-normal text-[var(--foreground)] text-lg">
        {quote}
      </p>
      <footer className="flex items-center gap-5">
        <img
          className="w-16 h-16 rounded-full aspect-square object-cover"
          src={img}
          alt={name}
        />
        <div className="flex flex-col">
          <h5 className="text-[1.2rem] font-bold tracking-tight font-[EB_Garamond]">
            {name}
          </h5>
          <small className="text-[var(--gold)] uppercase text-[0.8rem]">
            {role}, {company}
          </small>
        </div>
      </footer>
    </article>
  );
}
