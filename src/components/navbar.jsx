import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <nav className="flex flex-wrap items-center justify-between py-4 px-6 md:px-12 lg:px-36 bg-[var(--secondary-bg)] w-full border-b-[var(--gray)] border-b-[1px] relative">
      <div className="text-[var(--green)] z-20">
        <h1 className="font-[EB_Garamond] text-2xl font-semibold">Y-Axis</h1>
      </div>

      <button
        className="lg:hidden flex items-center text-[var(--foreground)] hover:text-[var(--green)] z-20"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Icon
          icon={isMenuOpen ? "heroicons:x-mark" : "heroicons:bars-3"}
          className={`text-2xl transition-transform duration-300 ${
            isMenuOpen ? "rotate-90 scale-110" : ""
          }`}
        />
      </button>

      <div
        className={`fixed inset-0 bg-[var(--secondary-bg)] flex flex-col items-center justify-center z-10 lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <ul
          className={`flex flex-col items-center gap-8 text-lg transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <li
            className="transition-all duration-300 ease-in-out"
            style={{ transitionDelay: isMenuOpen ? "100ms" : "0ms" }}
          >
            <a
              href="#about-us"
              className="hover:text-[var(--green)] transition-colors duration-300 text-center block"
              onClick={closeMenu}
            >
              About Us
            </a>
          </li>
          <li
            className="transition-all duration-300 ease-in-out"
            style={{ transitionDelay: isMenuOpen ? "150ms" : "0ms" }}
          >
            <a
              href="#products"
              className="hover:text-[var(--green)] transition-colors duration-300 text-center block"
              onClick={closeMenu}
            >
              Products
            </a>
          </li>
          <li
            className="transition-all duration-300 ease-in-out"
            style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
          >
            <a
              href="#reasons"
              className="hover:text-[var(--green)] transition-colors duration-300 text-center block"
              onClick={closeMenu}
            >
              Why Us
            </a>
          </li>
          <li
            className="transition-all duration-300 ease-in-out"
            style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
          >
            <a
              href="#testimonials"
              className="hover:text-[var(--green)] transition-colors duration-300 text-center block"
              onClick={closeMenu}
            >
              Testimonials
            </a>
          </li>
          <li
            className="flex flex-col items-center gap-4 mt-8 w-full max-w-xs transition-all duration-300 ease-in-out"
            style={{ transitionDelay: isMenuOpen ? "250ms" : "0ms" }}
          >
            <button className="text-[var(--foreground)] hover:text-[var(--green)] transition-colors duration-300 cursor-pointer w-full text-center py-2">
              Log In
            </button>
            <button className="bg-[var(--green)] text-white px-8 py-3 rounded-full flex items-center justify-center gap-1 hover:bg-opacity-90 transition-all duration-300 cursor-pointer w-full">
              Join Us{" "}
              <Icon icon="solar:arrow-right-up-linear" className="ml-1" />
            </button>
          </li>
        </ul>
      </div>

      <ul className="hidden lg:flex gap-8">
        <li>
          <a
            href="#about-us"
            className="hover:text-[var(--green)] transition-colors duration-300"
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#products"
            className="hover:text-[var(--green)] transition-colors duration-300"
          >
            Products
          </a>
        </li>
        <li>
          <a
            href="#reasons"
            className="hover:text-[var(--green)] transition-colors duration-300"
          >
            Why Us
          </a>
        </li>
        <li>
          <a
            href="#testimonials"
            className="hover:text-[var(--green)] transition-colors duration-300"
          >
            Testimonials
          </a>
        </li>
      </ul>

      <div className="hidden lg:flex items-center gap-4">
        <button className="text-[var(--foreground)] hover:text-[var(--green)] transition-colors duration-300 cursor-pointer">
          Log In
        </button>
        <button className="bg-[var(--green)] text-white px-6 py-2 rounded-full flex items-center gap-1 hover:bg-opacity-90 transition-all duration-300 cursor-pointer">
          Join Us <Icon icon="solar:arrow-right-up-linear" />
        </button>
      </div>
    </nav>
  );
}
