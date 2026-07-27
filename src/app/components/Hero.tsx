import { anton, jetbrainsMono } from "../lib/fonts";
import CursorReveal from "../CursorReveal";

type SocialLink = {
  label: string;
  href: string;
};

type HeroProps = {
  name?: string;
  title?: string;
  email?: string;
  stack?: string[];
  socials?: SocialLink[];
};

const DEFAULT_STACK = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Next.js",
];

const DEFAULT_SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/tansuplico" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tansuplico/" },
];

export default function Hero({
  name = "Tristan Suplico",
  title = "Full-Stack Developer",
  email = "tsuplico772@gmail.com",
  stack = DEFAULT_STACK,
  socials = DEFAULT_SOCIALS,
}: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Dot grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative flex min-h-screen flex-col">
        {/* Top nav */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
          <nav aria-label="Social links" className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="text-neutral-500 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </nav>

          <a
            href={`mailto:${email}`}
            className={`${jetbrainsMono.className} rounded-md border border-neutral-700 px-4 py-2 text-xs tracking-widest text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
          >
            {email.toUpperCase()}
          </a>
        </header>

        {/* Main content */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <CursorReveal size={320} color="#8A2BE2" className="w-full">
            <h1
              className={`${anton.className} w-full whitespace-nowrap text-center uppercase leading-[0.85] tracking-tight`}
            >
              <span
                className="block"
                style={{
                  fontSize: "clamp(3.5rem, 14vw, 13.5rem)",
                }}
              >
                {name}
              </span>
            </h1>
          </CursorReveal>

          <p
            className={`${jetbrainsMono.className} mt-8 text-xs uppercase tracking-[0.3em] text-neutral-400 sm:text-sm`}
          >
            {title}
            <span className="mx-2 text-sky-400">&middot;</span>
            UI Engineer
          </p>

          {/* Tech stack badges */}
          <ul
            aria-label="Technologies"
            className={`${jetbrainsMono.className} mt-16 flex flex-wrap items-center justify-center gap-3 px-4`}
          >
            {stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-neutral-800 px-3 py-1.5 text-[11px] uppercase tracking-wider text-neutral-400"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case "GitHub":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M23 4.9c-.8.36-1.67.6-2.58.71a4.5 4.5 0 0 0 1.98-2.48 9 9 0 0 1-2.85 1.09 4.48 4.48 0 0 0-7.63 4.09A12.72 12.72 0 0 1 2.9 3.6a4.48 4.48 0 0 0 1.39 5.98c-.72-.02-1.4-.22-2-.55v.06a4.48 4.48 0 0 0 3.6 4.4c-.66.18-1.36.2-2.02.08a4.49 4.49 0 0 0 4.19 3.12A9 9 0 0 1 1 19.08a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78l-.01-.58A9.2 9.2 0 0 0 23 4.9Z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
        </svg>
      );
    default:
      return null;
  }
}
