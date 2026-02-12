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
    <div className="space-y-6">
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Experience Entry</h3>
            <button
              onClick={() => deleteExperience(exp.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                updateExperience(exp.id, "company", e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
            <input
              placeholder="Role"
              value={exp.role}
              onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
            <input
              placeholder="Start Date (e.g., Jan 2020)"
              value={exp.start_date}
              onChange={(e) =>
                updateExperience(exp.id, "start_date", e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
            <input
              placeholder="End Date (e.g., Present)"
              value={exp.end_date}
              onChange={(e) =>
                updateExperience(exp.id, "end_date", e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
          </div>
          <textarea
            placeholder="Description"
            rows={3}
            value={exp.description}
            onChange={(e) =>
              updateExperience(exp.id, "description", e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40 resize-none"
          />
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 hover:border-white/40 transition-all"
      >
        <Plus size={20} /> Add Experience
      </button>
    </div>
  );
}
