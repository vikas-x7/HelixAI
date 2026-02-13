import { Plus, Trash2 } from "lucide-react";

export function ExperienceTab({ experiences, setExperiences }) {
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        company: "",
        role: "",
        start_date: "",
        end_date: "",
        description: "",
        display_order: experiences.length,
      },
    ]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    );
  };

  const deleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="p-5 bg-white border border-black/10 rounded space-y-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Experience Entry
            </h3>
            <button
              onClick={() => deleteExperience(exp.id)}
              className="text-black/40 hover:text-black transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                updateExperience(exp.id, "company", e.target.value)
              }
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
            <input
              placeholder="Role"
              value={exp.role}
              onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
            <input
              placeholder="Start Date (e.g., Jan 2020)"
              value={exp.start_date}
              onChange={(e) =>
                updateExperience(exp.id, "start_date", e.target.value)
              }
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
            <input
              placeholder="End Date (e.g., Present)"
              value={exp.end_date}
              onChange={(e) =>
                updateExperience(exp.id, "end_date", e.target.value)
              }
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          <textarea
            placeholder="Description"
            rows={3}
            value={exp.description}
            onChange={(e) =>
              updateExperience(exp.id, "description", e.target.value)
            }
            className="w-full bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 resize-none transition-colors"
          />
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-3 border border-dashed border-black/20 rounded flex items-center justify-center gap-2 hover:border-black/40 hover:bg-black/[0.02] transition-all text-sm font-medium text-black/60"
      >
        <Plus size={16} /> Add Experience
      </button>
    </div>
  );
}