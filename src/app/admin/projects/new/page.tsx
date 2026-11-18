import ProjectForm from '../ProjectForm'

export default function NewProjectPage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <ProjectForm isNew={true} />
    </div>
  )
}
