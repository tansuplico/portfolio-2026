"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { anton, jetbrainsMono } from "./lib/fonts";

export type Project = {
  title: string;
  category: string;
  href: string;
  span: "full" | "half";
  image: StaticImageData;
};

const CURSOR_SIZE = 60;

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !cursorRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cursorRef.current.style.transition = "none";
    cursorRef.current.style.left = `${x}px`;
    cursorRef.current.style.top = `${y}px`;
    cursorRef.current.style.transform = "translate(-50%, -50%) scale(1)";
  }

  function handleMouseLeave() {
    if (!cursorRef.current) return;
    cursorRef.current.style.transition = "transform 250ms ease-out";
    cursorRef.current.style.transform = "translate(-50%, -50%) scale(0)";
  }

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`View ${project.title}`}
      className="group relative block h-70 w-full cursor-none overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:h-80"
    >
      {/* Project image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={
          project.span === "full" ? "100vw" : "(min-width: 640px) 50vw, 100vw"
        }
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Dark overlay for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/40"
      />

      {/* Title */}
      <h3
        className={`${anton.className} absolute bottom-4 left-4 right-4 text-3xl uppercase leading-[0.95] tracking-tight text-white sm:bottom-5 sm:left-5 sm:text-4xl`}
      >
        {project.title}
      </h3>

      {/* Custom cursor: circle with an eye icon, replaces the default pointer */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 flex items-center justify-center rounded-full bg-[#8A2BE2] text-white motion-reduce:hidden"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          transform: "translate(-50%, -50%) scale(0)",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
    </button>
  );
}
