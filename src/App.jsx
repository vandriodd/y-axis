import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "./components/navbar";
import ProductCard from "./components/product-card";
import Footer from "./components/footer";
import TestimonialCard from "./components/testimonial-card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function App() {
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

  const products = [
    {
      img: "/aether.png",
      name: "Aether",
      description:
        "Lightweight and sharply refined. Aether blends Japanese titanium and soft acetate contours for clean, contemporary balance.",
      price: "$270",
    },
    {
      img: "/linea-04.jpg",
      name: "Linea 04",
      description:
        "Minimalism with intention. Linea 04 brings geometric structure and warm tones into perfect, everyday harmony.",
      price: "$295",
    },
    {
      img: "/horizon.jpg",
      name: "Horizon",
      description:
        "Architectural and assertive. Horizon is designed for those who push boundaries, where structure meets self-expression.",
      price: "$350",
    },
    {
      img: "/aether.png",
      name: "Aether",
      description:
        "Lightweight and sharply refined. Aether blends Japanese titanium and soft acetate contours for clean, contemporary balance.",
      price: "$270",
    },
    {
      img: "/linea-04.jpg",
      name: "Linea 04",
      description:
        "Minimalism with intention. Linea 04 brings geometric structure and warm tones into perfect, everyday harmony.",
      price: "$295",
    },
    {
      img: "/horizon.jpg",
      name: "Horizon",
      description:
        "Architectural and assertive. Horizon is designed for those who push boundaries, where structure meets self-expression.",
      price: "$350",
    },
  ];

  const testimonials = [
    {
      img: "/arjun-mehra.png",
      name: "Arjun Mehra",
      role: "Founder",
      company: "Form Supply",
      quote:
        "We curate only a handful of eyewear lines, and this one immediately stood out. The build quality, the restraint in design, and the consistency in craftsmanship made it an easy decision. Our clients notice the difference — and so do we.",
    },
    {
      img: "/ethan-rowe.png",
      name: "Ethan Rowe",
      role: "Retail director",
      company: "Mod&Co",
      quote:
        "What drew us in was the philosophy behind the product: quiet luxury, built with intention. Our customers value design with depth — and that's exactly what these frames deliver. It's not just eyewear; it's an experience we're proud to offer.",
    },
    {
      img: "/elise-van-den-berg.png",
      name: "Élise Van den Berg",
      role: "Buyer & Curator",
      company: "Nord Optique",
      quote:
        "We're very selective with what we bring into the studio, and this collection checked every box: elegant construction, timeless proportions, and a sense of calm confidence. The response from our clientele has been immediate.",
    },
    {
      img: "/arjun-mehra.png",
      name: "Arjun Mehra",
      role: "Founder",
      company: "Form Supply",
      quote:
        "We curate only a handful of eyewear lines, and this one immediately stood out. The build quality, the restraint in design, and the consistency in craftsmanship made it an easy decision. Our clients notice the difference — and so do we.",
    },
    {
      img: "/ethan-rowe.png",
      name: "Ethan Rowe",
      role: "Retail director",
      company: "Mod&Co",
      quote:
        "What drew us in was the philosophy behind the product: quiet luxury, built with intention. Our customers value design with depth — and that's exactly what these frames deliver. It's not just eyewear; it's an experience we're proud to offer.",
    },
    {
      img: "/elise-van-den-berg.png",
      name: "Élise Van den Berg",
      role: "Buyer & Curator",
      company: "Nord Optique",
      quote:
        "We're very selective with what we bring into the studio, and this collection checked every box: elegant construction, timeless proportions, and a sense of calm confidence. The response from our clientele has been immediate.",
    },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-md bg-[var(--secondary-bg)]" : ""
        }`}
      >
        <Navbar />
      </div>

      <div className="pt-16">
        <header className="flex flex-col items-center py-20 gap-14 h-screen px-36">
          <h1 className="primary-heading text-center">
            Everything starts with vision.
          </h1>

          <img src="/hero-img.png" alt="hero-img" className="w-full" />

          <a
            href="#about-us"
            className="flex flex-col items-center gap-2 subtitle"
          >
            Scroll to discover
            <Icon icon="heroicons:arrow-down-20-solid" />
          </a>
        </header>

        <main className="flex flex-col items-center gap-20 min-h-screen">
          <section
            id="about-us"
            className="flex flex-col lg:flex-row items-center gap-16 py-20 px-36 bg-[var(--secondary-bg)]"
          >
            <img src="/about-us-img.png" alt="about-us-img" />
            <div className="flex flex-col gap-5">
              <header className="heading">
                <h3>Who we are</h3>
                <h2>About Us</h2>
              </header>

              <div className="flex flex-col items-center gap-2">
                <p className="text-center font-['EB_Garamond'] text-[1.5rem]">
                  "We don't just design eyewear — we shape how people see and
                  are seen. Every piece carries intention, and every detail
                  speaks quietly of quality."
                </p>

                <small className="flex flex-col items-center [&>span]:text-[var(--gold)] [&>span]:uppercase mt-4">
                  Mateo L. Ortega
                  <span>Founder & Creative director</span>
                </small>
              </div>
            </div>
          </section>

          <section id="products" className="w-full px-4">
            <header className="heading">
              <h3>Most popular</h3>
              <h2>Our exclusive products</h2>
            </header>
            <div className="w-full">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                {products.map((product) => (
                  <SwiperSlide key={product.name}>
                    <ProductCard {...product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          <section
            id="reasons"
            className="flex flex-col w-full lg:flex-row items-center justify-between py-20 px-36 bg-[var(--secondary-bg)]"
          >
            <div>
              <header className="heading">
                <h3>The reasons</h3>
                <h2>Why choose us?</h2>
              </header>
              <div className="flex flex-col gap-5">
                <p>
                  We don't follow trends, we craft timeless eyewear with
                  intention, precision, and character.
                </p>

                <ul className="flex flex-col [&>li]:flex [&>li]:flex-row [&>li]:gap-8 [&>li]:py-4 [&>li]:border-b-[var(--gold)] [&>li]:border-b-[1px] [&>li>span]:text-[var(--gold)]">
                  <li>
                    <span>01</span>
                    <p>Handcrafted in small batches</p>
                  </li>
                  <li>
                    <span>02</span>
                    <p>Premium materials, always</p>
                  </li>
                  <li>
                    <span>03</span>
                    <p>Design-driven, never generic</p>
                  </li>
                  <li>
                    <span>04</span>
                    <p>Limited collections, boutique feel</p>
                  </li>
                  <li>
                    <span>05</span>
                    <p>Made to frame everything differently</p>
                  </li>
                </ul>
              </div>
            </div>
            <img src="/reasons.png" alt="reasons" />
          </section>

          <section id="testimonials" className="w-full px-4">
            <header className="heading">
              <h3>Testimonials</h3>
              <h2>What our clients say?</h2>
            </header>
            <div className="w-full">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.name}>
                    <TestimonialCard {...testimonial} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          <section
            id="become-a-client"
            className="bg-[var(--secondary-bg)] w-full flex flex-col justify-center items-center gap-10 px-36 py-20"
          >
            <header className="heading">
              <h3>Become a client</h3>
              <h2>Start seeing differently</h2>
            </header>
            <div className="flex flex-col items-center gap-5">
              <img src="become-a-client.png" alt="become-a-client" />

              <p className="font-[EB_Garamond] text-[2rem] text-center">
                Registration gives you full access to our collections, tailored
                service, and limited releases.
              </p>

              <button className="flex items-center gap-2 px-10 py-2 rounded-full bg-[var(--green)] text-white cursor-pointer">
                Join Now
                <Icon icon="solar:arrow-right-up-linear" />
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
