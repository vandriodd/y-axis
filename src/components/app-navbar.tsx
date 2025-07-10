import { Link } from "wouter";
import { Icon } from "@iconify/react/dist/iconify.js";

const CART_ITEMS_COUNT = 3;

export default function AppNavbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between py-4 px-6 md:px-12 lg:px-36 bg-bg-secondary w-full border-b-gray border-b-[1px] relative">
      <Link to="/home" className="text-green">
        <h1 className="font-garamond text-2xl font-semibold">Y-Axis</h1>
      </Link>

      <div className="flex items-center gap-5">
        <button className="relative group p-2 rounded-full hover:bg-gray-100 text-foreground hover:text-green transition-all duration-300 cursor-pointer">
          <Icon icon="solar:cart-large-minimalistic-bold" className="w-6 h-6" />
          {CART_ITEMS_COUNT > 0 && (
            <span className="absolute -top-1 -right-1 bg-green text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-bg-secondary group-hover:scale-110 transition-transform">
              {CART_ITEMS_COUNT}
            </span>
          )}
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 text-foreground hover:text-green transition-all duration-300 cursor-pointer">
          <Icon icon="solar:user-circle-bold" className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
