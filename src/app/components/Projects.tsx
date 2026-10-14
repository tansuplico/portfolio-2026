"use client";

import { useState } from "react";
import { anton, jetbrainsMono } from "../lib/fonts";
import ProjectCard, { type Project } from "../ProjectCard";
import ProjectModal from "../ProjectModal";

import verifast from "../assets/verifast.png";
import apiis from "../assets/apiis.png";
import vacay from "../assets/vacay.png";
import xtrack from "../assets/xtrack.png";
import furnistore from "../assets/furnistore.png";
import dailydo from "../assets/dailydo.png";
import splitscale from "../assets/splitscale.png";

const DEFAULT_PROJECTS: Project[] = [
  {
    title: "Verifast Student+",
    category: "UI Design · Mobile App Development",
    href: "#",
    span: "half",
    image: verifast,
  },
  {
    title: "APIIS Learning Management System",
    category: "UI Design · System Development",
    href: "#",
    span: "half",
    image: apiis,
  },
  {
    title: "XTrack",
    category: "UI Design · Web Development",
    href: "#",
    span: "half",
    image: xtrack,
  },
  {
    title: "DailyDo",
    category: "UI Design · Web Development",
    href: "#",
    span: "half",
    image: dailydo,
  },
  {
    title: "Vacay.com",
    category: "UI Design · Web Development",
    href: "#",
    span: "half",
    image: vacay,
  },
  {
    title: "Furnistore",
    category: "UI Design · Web Development",
    href: "#",
    span: "half",
    image: furnistore,
  },
  {
    title: "Splitscale Portfolio",
    category: "UI Design · Web Development",
    href: "#",
    span: "half",
    image: splitscale,
  },
];

type ProjectsProps = {
  eyebrow?: string;
  projects?: Project[];
};

export default function Projects({
  projects = DEFAULT_PROJECTS,
}: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section
      className={`${anton.variable} ${jetbrainsMono.variable} bg-black px-4 py-16 text-white sm:px-8 sm:py-20`}
    >
      {/* Section header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:mb-10 sm:flex-row sm:items-end">
        <h2
          className={`${anton.className} text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl`}
        >
          Projects
        </h2>
      </div>

      {/* Bento grid */}
      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.title}
            className={
              project.span === "full" ? "sm:col-span-2" : "sm:col-span-1"
            }
          >
            <ProjectCard project={project} onOpen={setActiveProject} />
          </li>
        ))}
      </ul>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
