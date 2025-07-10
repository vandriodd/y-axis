import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Navbar from "../components/navbar";
import ProductLandingCard from "../components/product-landing-card";
import Footer from "../components/footer";
import TestimonialCard from "../components/testimonial-card";
import { Carousel, CarouselItem, CarouselContent, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

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

const reasons = [
  {
    number: "01",
    title: "Handcrafted in small batches",
  },
  {
    number: "02",
    title: "Premium materials, always",
  },
  {
    number: "03",
    title: "Design-driven, never generic",
  },
  {
    number: "04",
    title: "Limited collections, boutique feel",
  },
  {
    number: "05",
    title: "Made to frame everything differently",
  },
];

export default function Landing() {
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
          scrolled ? "shadow-md bg-[var(--secondary-bg)]" : ""
        }`}
      >
        <Navbar />
      </div>

      <header className="flex flex-col items-center py-20 gap-14 min-h-screen justify-center px-12 md:px-36">
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

      <main className="flex flex-col items-center gap-20 min-h-screen [&>section]:scroll-mt-24 [&>section]:w-full">
          <section
          id="about-us"
            className="bg-bg-secondary py-12 px-6 md:py-20 md:px-36"
          >
            <div className="flex flex-col xl:flex-row items-center gap-16 max-w-6xl mx-auto">
              <img src="/about-us-img.png" alt="about-us-img" />
              <div className="flex flex-col">
                <header className="heading">
                  <h3>Who we are</h3>
                  <h2>About Us</h2>
                </header>

                <div className="flex flex-col items-center gap-2">
                  <p className="text-center font-garamond text-2xl">
                    "We don't just design eyewear — we shape how people see and
                    are seen. Every piece carries intention, and every detail
                    speaks quietly of quality."
                  </p>

                  <small className="flex flex-col items-center [&>span]:text-gold [&>span]:uppercase mt-4">
                    Mateo L. Ortega
                    <span>Founder & Creative director</span>
                  </small>
                </div>
              </div>
            </div>
          </section>

          <section id="products" className="px-4">
            <header className="heading">
              <h3>Most popular</h3>
              <h2>Our exclusive products</h2>
            </header>
            <div className="w-full relative max-w-6xl mx-auto px-16 flex flex-row justify-center">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-6xl"
              >
                <CarouselContent>
                  {products.map((product, index) => (
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={product.name + index}>
                      <ProductLandingCard {...product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>

          <section
            id="reasons"
            className="flex flex-col w-full lg:flex-row items-center px-12 py-20 xl:px-36 bg-bg-secondary gap-12 justify-center"
          >
            <div className="max-w-lg">
              <header className="heading">
                <h3>The reasons</h3>
                <h2>Why choose us?</h2>
              </header>
              <div className="flex flex-col gap-4">
                <p>
                  We don't follow trends, we craft timeless eyewear with
                  intention, precision, and character.
                </p>

                <ul className="flex flex-col">
                  {reasons.map((reason, i) => (
                    <li
                      key={`${reason.title}-${i}`}
                      className="flex flex-row gap-8 py-4 border-b-gold border-b-[1px]"
                    >
                      <span className="text-gold font-garamond font-bold">0{i + 1}</span>
                      <p>{reason.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <img src="/img-1.jpg" alt="A photo of a shelf with eyewear" className="w-sm max-w-md md:w-full" />
          </section>

          <section id="testimonials" className="px-4 py-16 relative overflow-hidden">
            <header className="heading">
              <h3>Testimonials</h3>
              <h2>What our clients say?</h2>
            </header>

            <div className="w-full relative max-w-6xl mx-auto px-16 flex flex-row justify-center">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-6xl"
              >
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem className="basis-full" key={testimonial.name + index}>
                      <TestimonialCard {...testimonial} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>

          <section
            id="become-a-client"
            className="bg-bg-secondary flex flex-col justify-center items-center  px-12 py-20 lg:px-36"
          >
            <header className="heading">
              <h3>Become a client</h3>
              <h2>Start seeing differently</h2>
            </header>

            <div className="flex flex-col items-center gap-5">
              <img className="w-full h-96 object-cover border-[0.5px] border-gold/50" src="login.jpg" alt="become-a-client" />

              <p className="font-garamond text-2xl md:text-3xl text-center">
                Registration gives you full access to our collections, tailored
                service, and limited releases.
              </p>

              <Button className="px-10">
                Join Now
                <Icon icon="solar:arrow-right-up-linear" />
              </Button>
            </div>
          </section>
      </main>

      <Footer />
    </>
    )
}
