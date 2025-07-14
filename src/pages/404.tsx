import { useLocation } from "wouter";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary text-center p-4">
      <header className="flex flex-col items-center gap-6">
        <img
          src="/404.svg"
          alt="Three people carrying the digits of 404 in a funny way"
          className="w-1/2 min-w-2/3"
        />

        <div className="flex flex-col items-center">
          <h1 className="font-garamond text-4xl md:text-5xl font-bold mb-3 text-accent">
            We didn't see that page!
          </h1>

          <p className="text-lg md:text-xl max-w-md mx-auto mb-6 text-gray-600">
            But don't worry, you can go back for looking for something else
          </p>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button onClick={() => setLocation("/home")}>
          <Icon icon="mdi:home" />
          Go to Homepage
        </Button>
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          className="bg-bg-primary border-1 border-gold text-gold hover:bg-gold hover:text-white transition-all"
        >
          <Icon icon="mdi:arrow-left" />
          Go Back
        </Button>
      </div>
    </div>
  );
}
