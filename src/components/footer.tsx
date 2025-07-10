import { Icon } from "@iconify/react/dist/iconify.js";

const socials = [
  {
    name: "Instagram",
    icon: "mdi:instagram",
    href: "#",
  },
  {
    name: "Facebook",
    icon: "mdi:facebook",
    href: "#",
  },
  {
    name: "Twitter",
    icon: "mdi:twitter",
    href: "#",
  },
  {
    name: "Pinterest",
    icon: "mdi:pinterest",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary text-foreground py-12 px-6 md:px-12 lg:px-36 border-t-gray border-t-[1px] bottom-0 left-0 right-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
        <div className="w-full md:max-w-md items-center text-center md:text-left">
          <h2 className="text-3xl font-bold font-[EB_Garamond] text-green mb-2">
            Y-axis
          </h2>
          <p className="text-lg">Everything starts with vision.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center text-center md:text-left [&>a]:whitespace-nowrap [&>address]:whitespace-nowrap">
          <a
            href="mailto:contact@yaxis.com"
            className="hover:text-green transition-colors lg:border-r-gold lg:border-r-[1px] pr-4"
          >
            contact@yaxis.com
          </a>

          <a
            href="tel:+23089078908"
            className="hover:text-green transition-colors lg:border-r-gold lg:border-r-[1px] pr-4"
          >
            +230 8907 8908
          </a>

          <address className="not-italic">Port Louis, Mauritius</address>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8">
        <div className="flex gap-6 mb-6 md:mb-0">
          {socials.map((social, i) => (
            <a
              key={`${social.name}-${i}`}
              href={social.href}
              aria-label={social.name}
              className="text-2xl text-green hover:translate-y-[-2px] transition-transform"
            >
              <Icon icon={social.icon} />
            </a>
          ))}
        </div>

        <div className="text-sm">
          Copyright &copy; {new Date().getFullYear()} Y-Axis. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
