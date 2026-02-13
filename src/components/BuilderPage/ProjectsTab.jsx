import { Plus, Trash2 } from "lucide-react";
import useUpload from "@/utils/useUpload";

export function ProjectsTab({ projects, setProjects }) {
  const { upload, uploading } = useUpload();

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now(),
        title: "",
        description: "",
        image_url: "",
        link: "",
        technologies: "",
        display_order: projects.length,
      },
    ]);
  };

  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj,
      ),
    );
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  const handleProjectImageUpload = async (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file);
    updateProject(id, "image_url", url);
  };

  return (
    <div className="space-y-4">
      {projects.map((proj) => (
        <div
          key={proj.id}
          className="p-5 bg-white border border-black/10 rounded space-y-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Project Entry
            </h3>
            <button
              onClick={() => deleteProject(proj.id)}
              className="text-black/40 hover:text-black transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => updateProject(proj.id, "title", e.target.value)}
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
            <input
              placeholder="Project Link (URL)"
              value={proj.link}
              onChange={(e) => updateProject(proj.id, "link", e.target.value)}
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          <textarea
            placeholder="Description"
            rows={3}
            value={proj.description}
            onChange={(e) =>
              updateProject(proj.id, "description", e.target.value)
            }
            className="w-full bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 resize-none transition-colors"
          />
          <input
            placeholder="Technologies (comma separated)"
            value={proj.technologies}
            onChange={(e) =>
              updateProject(proj.id, "technologies", e.target.value)
            }
            className="w-full bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
          />
          <div>
            <label className="text-xs font-medium text-black hover:text-black/60 cursor-pointer transition-colors">
              {uploading ? "Uploading..." : "Upload Project Image"}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleProjectImageUpload(proj.id, e)}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {proj.image_url && (
              <img
                src={proj.image_url}
                alt="Project"
                className="mt-2 w-full h-32 object-cover rounded border border-black/10 grayscale"
              />
            )}
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full py-3 border border-dashed border-black/20 rounded flex items-center justify-center gap-2 hover:border-black/40 hover:bg-black/[0.02] transition-all text-sm font-medium text-black/60"
      >
        <Plus size={16} /> Add Project
      </button>
    </div>
  );
}