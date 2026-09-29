import Link from "next/link";
import { type Project, youtubeThumb } from "@/lib/projects";

/** Card grid (1/2/3 columns): YouTube thumbnail with title + category on top. */
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          data-cursor="Play"
          className="group relative block aspect-video overflow-hidden rounded-2xl border border-ivory/12 bg-[#111111]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={youtubeThumb(p.youtubeId)}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-carbon/80 via-transparent to-transparent" />
          <div className="relative flex items-start justify-between gap-4 p-5 md:p-6">
            <h3 className="font-display text-base font-bold uppercase leading-tight text-ivory md:text-lg">
              {p.title}
            </h3>
            <span className="shrink-0 rounded-full border border-ivory/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-grey">
              {p.category}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
