import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid";
import { PROJECTS } from "@/lib/projects";

const HOME_LIMIT = 6;

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-grey">
        Selected work — AI films, CGI and ads
      </p>
      <h2 className="font-display mb-12 text-4xl font-bold uppercase leading-[1.05] md:text-6xl">
        Projects<span className="text-outline">.</span>
      </h2>

      <ProjectGrid projects={PROJECTS.slice(0, HOME_LIMIT)} />

      {PROJECTS.length > HOME_LIMIT && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            data-cursor="Go"
            className="rounded-full border border-ivory/25 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-ivory hover:text-carbon"
          >
            Show more
          </Link>
        </div>
      )}
    </section>
  );
}
