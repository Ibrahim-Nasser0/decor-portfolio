import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectById, getProjects, getDesignerProfile } from "@/lib/dataRepository";
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
  const [project, profile] = await Promise.all([
    getProjectById(id),
    getDesignerProfile(),
  ]);

  const brandName = profile?.nameEn || "Alaa Essa";

  if (!project) {
    return {
      title: `Project Not Found | ${brandName}`,
    };
  }

  return {
    title: `${project.titleEn || project.title} | Eng. ${brandName} Architecture`,
    description: project.descriptionEn || project.description || `Architectural project by Eng. ${brandName}`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, profile, allProjects] = await Promise.all([
    getProjectById(id),
    getDesignerProfile(),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} profile={profile} allProjects={allProjects} />;
}
