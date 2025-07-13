import { useState } from "react";
import { useLocation } from "wouter";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";

const links = [
  { href: "#about-us", label: "About Us" },
  { href: "#products", label: "Products" },
  { href: "#reasons", label: "Why Us" },
  { href: "#testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsLoggedIn] = useState(false);
  const [, setLocation] = useLocation();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  const handleLogIn = (): void => {
    setLocation("/login");
    setIsLoggedIn(true);
  };

  const handleJoinUs = (): void => {
    setLocation("/onboarding");
  };

  return (
    <nav className="flex flex-wrap items-center justify-between py-4 px-6 md:px-12 lg:px-36 bg-bg-secondary w-full border-b-gray border-b-[1px] relative">
      <div className="text-green z-20">
        <h1 className="font-[EB_Garamond] text-2xl font-semibold">Y-Axis</h1>
      </div>

      <button
        className="lg:hidden flex items-center text-foreground hover:text-green z-20 cursor-pointer"
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
        className={`fixed inset-0 bg-bg-secondary flex flex-col items-center justify-center z-10 lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <ul
          className={`flex flex-col items-center gap-12 transition-all duration-300 ease-in-out uppercase tracking-wider text-3xl ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {links.map((link, index) => (
            <li
              className="transition-all duration-500 ease-in-out"
              style={{
                transitionDelay: `${100 + index * 100}ms`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
              }}
              key={link.label}
            >
              <a
                href={link.href}
                className="hover:text-green transition-colors duration-200 text-center block"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li
            className="flex flex-col items-center gap-4 mt-8 w-full max-w-xs transition-all duration-500 ease-in-out"
            style={{
              transitionDelay: "500ms",
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <button
              className="text-foreground hover:text-green transition-colors duration-500 cursor-pointer w-full text-center py-2 uppercase"
              onClick={handleLogIn}
            >
              Log In
            </button>
            <Button
              className="px-8 py-3 rounded-full flex items-center justify-center gap-1 w-full transition-all duration-500"
              size="lg"
              onClick={handleJoinUs}
            >
              Join Us
              <Icon
                icon="solar:arrow-right-up-linear"
                className="ml-1 size-8"
              />
            </Button>
          </li>
        </ul>
      </div>

      <ul className="hidden lg:flex gap-8">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-foreground hover:text-green transition-colors duration-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex items-center gap-4">
        <button
          className="text-foreground hover:text-green transition-colors duration-300 cursor-pointer"
          onClick={handleLogIn}
        >
          Log In
        </button>
        <button
          className="bg-green text-white px-6 py-2 rounded-full flex items-center gap-1 hover:bg-opacity-90 transition-all duration-300 cursor-pointer hover:bg-accent-foreground/80"
          onClick={handleJoinUs}
        >
          Join Us <Icon icon="solar:arrow-right-up-linear" />
        </button>
      </div>
    </nav>
  );
}
