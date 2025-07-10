import { useLocation } from 'wouter';
import { Icon } from '@iconify/react';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary text-center p-4">
      <header className="flex flex-col items-center gap-6">
        <img src="/404.svg" alt="Three people carrying the digits of 404 in a funny way" className="w-1/2 min-w-2/3" />

        <div className="flex flex-col items-center">
          <h1 className="font-garamond text-4xl md:text-5xl font-bold mb-3 text-accent-foreground">
            We didn't see that page!
          </h1>

          <p className="text-lg md:text-xl max-w-md mx-auto mb-6 text-gray-600">
            But don't worry, you can go back for looking for something else
          </p>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button
          onClick={() => setLocation('/home')}
          className="flex items-center justify-center gap-2 bg-green text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all"
        >
          <Icon icon="mdi:home" />
          Go to Homepage
        </button>

        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 bg-transparent border-2 border-gold text-gold px-6 py-3 rounded-full hover:bg-gold/5 transition-all"
        >
          <Icon icon="mdi:arrow-left" />
          Go Back
        </button>
      </div>
    </div>
  );
}
