import { jetbrainsMono } from "../lib/fonts";

type FooterProps = {
  name?: string;
  year?: number;
};

export default function Footer({
  name = "Tristan.dev",
  year = new Date().getFullYear(),
}: FooterProps) {
  return (
    <footer className="flex flex-col items-center gap-3 bg-black px-6 py-6 text-center text-white sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-10 sm:py-8 sm:text-left">
      <p
        className={`${jetbrainsMono.className} text-xs uppercase tracking-widest text-neutral-500 sm:text-sm`}
      >
        &copy; {year} {name}. All rights reserved.
      </p>

      <a
        href="#"
        className={`${jetbrainsMono.className} text-sm uppercase tracking-widest text-white transition-colors hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:text-base`}
      >
        {name}
      </a>
    </footer>
  );
}
