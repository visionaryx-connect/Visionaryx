import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import ProjectGrid from "@/components/ProjectGrid";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects — Visionary X" };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <Link href="/" aria-label="Visionary X — home" data-cursor="Home">
        <Logo />
      </Link>
      <h1 className="font-display mb-12 mt-16 text-5xl font-bold uppercase md:text-7xl">
        Projects<span className="text-outline">.</span>
      </h1>
      <ProjectGrid projects={PROJECTS} />
    </main>
  );
}
