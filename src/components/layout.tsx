import { useEffect, useState, type ReactNode } from 'react';
import AppNavbar from './app-navbar';
import Footer from './footer';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mb-16 ${
          scrolled ? "shadow-md bg-bg-secondary" : ""
        }`}
      >
        <AppNavbar />
      </div>

      <main className="mt-[calc(64px+16px)]">
        {children}
      </main>

      <Footer />
    </>
  )
}
