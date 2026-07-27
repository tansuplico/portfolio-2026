"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Project } from "./ProjectCard";
import { anton, jetbrainsMono } from "./lib/fonts";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const TRANSITION_MS = 280;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mountedProject, setMountedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (project) {
      setMountedProject(project);
      let innerRaf = 0;
      const outerRaf = requestAnimationFrame(() => {
        innerRaf = requestAnimationFrame(() => setIsVisible(true));
      });
      return () => {
        cancelAnimationFrame(outerRaf);
        cancelAnimationFrame(innerRaf);
      };
    }

    if (mountedProject) {
      setIsVisible(false);
      const timeout = setTimeout(() => setMountedProject(null), TRANSITION_MS);
      return () => clearTimeout(timeout);
    }
  }, [project]);

  useEffect(() => {
    if (!mountedProject) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    function preventScroll(e: Event) {
      e.preventDefault();
    }

    window.addEventListener("keydown", handleKey);
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [mountedProject, onClose]);

  if (!mountedProject) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/85 px-4 py-10 transition-opacity sm:items-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${TRANSITION_MS}ms`,
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={mountedProject.title}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl origin-center transition-transform ease-out"
        style={{
          transform: isVisible ? "scale(1)" : "scale(0.7)",
          transitionDuration: `${TRANSITION_MS}ms`,
        }}
      >
        <div className="relative w-full overflow-hidden rounded-lg bg-neutral-900">
          <Image
            src={mountedProject.image}
            alt={mountedProject.title}
            sizes="(min-width: 1024px) 900px, 100vw"
            className="h-auto max-h-[75vh] w-full object-contain"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`${jetbrainsMono.className} absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs uppercase tracking-widest text-white/80 backdrop-blur transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60`}
          >
            Close ✕
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3
            className={`${anton.className} text-3xl uppercase leading-none text-white sm:text-4xl`}
          >
            {mountedProject.title}
          </h3>
          <p
            className={`${jetbrainsMono.className} text-xs uppercase tracking-widest text-neutral-400`}
          >
            {mountedProject.category}
          </p>
        </div>
      </div>
    </div>
  );
}
