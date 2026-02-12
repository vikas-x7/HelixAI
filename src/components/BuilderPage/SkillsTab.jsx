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
    <div className="space-y-6">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Skill Entry</h3>
            <button
              onClick={() => deleteSkill(skill.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Skill Name"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
            <select
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
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
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addSkill}
        className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 hover:border-white/40 transition-all"
      >
        <Plus size={20} /> Add Skill
      </button>
    </div>
  );
}
