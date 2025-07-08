import { Icon } from "@iconify/react/dist/iconify.js";

export default function Footer() {
  return (
    <footer className="bg-[var(--secondary-bg)] text-[var(--foreground)] py-12 px-6 md:px-12 lg:px-36 border-t-[var(--gray)] border-t-[1px]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
        <div className="w-full md:max-w-md items-center text-center md:text-left">
          <h2 className="text-3xl font-bold font-[EB_Garamond] text-[var(--green)] mb-2">
            Y-axis
          </h2>
          <p className="text-lg">Everything starts with vision.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center text-center md:text-left">
          <a
            href="mailto:contact@yaxis.com"
            className="hover:text-[var(--gold)] transition-colors md:border-r-[var(--gold)] md:border-r-[1px] pr-4"
          >
            contact@yaxis.com
          </a>

          <a
            href="tel:+23089078908"
            className="hover:text-[var(--gold)] transition-colors md:border-r-[var(--gold)] md:border-r-[1px] pr-4"
          >
            +230 8907 8908
          </a>

          <address className="not-italic">Port Louis, Mauritius</address>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8">
        <div className="flex gap-6 mb-6 md:mb-0">
          <a
            href="#"
            aria-label="Instagram"
            className="text-2xl text-[var(--green)] hover:translate-y-[-2px] transition-transform"
          >
            <Icon icon="mdi:instagram" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="text-2xl text-[var(--green)] hover:translate-y-[-2px] transition-transform"
          >
            <Icon icon="mdi:facebook" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-2xl text-[var(--green)] hover:translate-y-[-2px] transition-transform"
          >
            <Icon icon="mdi:twitter" />
          </a>
          <a
            href="#"
            aria-label="Pinterest"
            className="text-2xl text-[var(--green)] hover:translate-y-[-2px] transition-transform"
          >
            <Icon icon="mdi:pinterest" />
          </a>
        </div>

        <div className="text-sm">
          Copyright &copy; {new Date().getFullYear()} Y-Axis. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
