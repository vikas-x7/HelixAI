import { Plus, Trash2 } from "lucide-react";

export function SkillsTab({ skills, setSkills }) {
  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now(),
        name: "",
        level: "Intermediate",
        category: "Technical",
        display_order: skills.length,
      },
    ]);
  };

  const updateSkill = (id, field, value) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    );
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="p-5 bg-white border border-black/10 rounded space-y-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Skill Entry
            </h3>
            <button
              onClick={() => deleteSkill(skill.id)}
              className="text-black/40 hover:text-black transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              placeholder="Skill Name"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
            <select
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <input
              placeholder="Category (e.g., Technical)"
              value={skill.category}
              onChange={(e) =>
                updateSkill(skill.id, "category", e.target.value)
              }
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addSkill}
        className="w-full py-3 border border-dashed border-black/20 rounded flex items-center justify-center gap-2 hover:border-black/40 hover:bg-black/[0.02] transition-all text-sm font-medium text-black/60"
      >
        <Plus size={16} /> Add Skill
      </button>
    </div>
  );
}