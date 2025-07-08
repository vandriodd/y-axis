export default function ProductCard({ img, name, description, price }) {
  return (
    <article className="max-w-sm bg-[var(--secondary-bg)] border-[var(--gray)] border-[0.5px] rounded-2xl">
      <a href="#">
        <img className="rounded-t-lg" src={img} alt={`Product ${name} image`} />
      </a>
      <div className="flex flex-col items-start h-60 p-6">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight font-[EB_Garamond]">
            {name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-[var(--foreground)]">
          {description}
        </p>
        <button className="mt-auto px-3 py-2 text-sm font-medium text-center text-[var(--secondary-bg)] bg-[var(--green)] rounded-full cursor-pointer">
          Order Now
        </button>
      </div>
    </article>
  );
}
