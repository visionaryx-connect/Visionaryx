import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import ProjectGrid from "@/components/ProjectGrid";
import { PROJECTS, getProject } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const p = getProject((await props.params).slug);
  return { title: p ? `${p.title} — Visionary X` : "Project — Visionary X" };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  // Next two projects, wrapping around the list.
  const i = PROJECTS.indexOf(project);
  const next = [1, 2]
    .map((n) => PROJECTS[(i + n) % PROJECTS.length])
    .filter((p) => p !== project);

  const meta = [
    ["Category", project.category],
    ["Client", project.client],
    ["Industry", project.industry],
  ].filter(([, v]) => v);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="Visionary X — home" data-cursor="Home">
          <Logo />
        </Link>
        <Link
          href="/projects"
          className="text-[13px] font-medium uppercase tracking-[0.18em] text-grey hover:text-ivory"
        >
          All projects
        </Link>
      </div>

      <h1 className="font-display mb-10 mt-16 text-4xl font-bold uppercase leading-[1.05] md:text-6xl">
        {project.title}
      </h1>

      <div
        className={`overflow-hidden rounded-2xl border border-ivory/12 bg-[#111111] ${
          project.vertical
            ? "mx-auto aspect-[9/16] w-full max-w-[min(420px,calc(80vh*9/16))]"
            : "aspect-video"
        }`}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1`}
          title={project.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full"
        />
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-5 text-sm leading-relaxed text-grey md:text-base">
          {project.story.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <dl className="space-y-6">
          {meta.map(([label, value]) => (
            <div key={label} className="border-t border-ivory/12 pt-4">
              <dt className="text-[10px] uppercase tracking-[0.2em] text-grey">{label}</dt>
              <dd className="font-display mt-1 text-xl font-bold text-ivory">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {next.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display mb-8 text-3xl font-bold uppercase md:text-5xl">
            Next projects<span className="text-outline">.</span>
          </h2>
          <ProjectGrid projects={next} />
        </section>
      )}

      <div className="mt-24 flex justify-center">
        <Link
          href="/#contact"
          data-cursor="Launch"
          className="rounded-full bg-ivory px-6 py-3 text-[13px] font-bold uppercase tracking-[0.14em] text-carbon"
        >
          Have a project in mind?
        </Link>
      </div>
    </main>
  );
}
