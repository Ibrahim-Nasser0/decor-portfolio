import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectById, getProjects } from "@/lib/dataRepository";
import ProjectDetailView from "@/components/ProjectDetailView";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found | Alaa Issa",
    };
  }

  return {
    title: `${project.titleEn} | Eng. Alaa Issa Architecture`,
    description: project.descriptionEn,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
