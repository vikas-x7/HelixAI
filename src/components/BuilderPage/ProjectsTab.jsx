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
    <div className="space-y-6">
      {projects.map((proj) => (
        <div
          key={proj.id}
          className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Project Entry</h3>
            <button
              onClick={() => deleteProject(proj.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => updateProject(proj.id, "title", e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
            <input
              placeholder="Project Link (URL)"
              value={proj.link}
              onChange={(e) => updateProject(proj.id, "link", e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
          </div>
          <textarea
            placeholder="Description"
            rows={3}
            value={proj.description}
            onChange={(e) =>
              updateProject(proj.id, "description", e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40 resize-none"
          />
          <input
            placeholder="Technologies (comma separated)"
            value={proj.technologies}
            onChange={(e) =>
              updateProject(proj.id, "technologies", e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
          />
          <div>
            <label className="text-xs font-bold text-white hover:underline cursor-pointer">
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
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 hover:border-white/40 transition-all"
      >
        <Plus size={20} /> Add Project
      </button>
    </div>
  );
}
