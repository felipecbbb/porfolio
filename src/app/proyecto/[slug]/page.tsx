import { projects, getProjectBySlug } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";

const CUSTOM_SLUGS = new Set([
  "wavepanel",
  "grupo-axial",
  "noa",
  "lorena-amadio",
  "entre-olas-surf",
  "samba-trips",
  "alma-de-nomada",
  "la-inquieta",
]);

export function generateStaticParams() {
  return projects
    .filter((p) => !CUSTOM_SLUGS.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Felipe Cámara`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
