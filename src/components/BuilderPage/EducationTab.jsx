import { Plus, Trash2 } from "lucide-react";

export function EducationTab({ education, setEducation }) {
  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now(),
        institution: "",
        degree: "",
        field: "",
        start_date: "",
        end_date: "",
        display_order: education.length,
      },
    ]);
  };

  const updateEducation = (id, field, value) => {
    setEducation(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    );
  };

  const deleteEducation = (id) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div
          key={edu.id}
          className="p-5 bg-white border border-black/10 rounded space-y-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Education Entry
            </h3>
            <button
              onClick={() => deleteEducation(edu.id)}
              className="text-black/40 hover:text-black transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                updateEducation(edu.id, "institution", e.target.value)
              }
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
            <input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                updateEducation(edu.id, "degree", e.target.value)
              }
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
            <input
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
            <input
              placeholder="Start - End (e.g., 2018 - 2022)"
              value={edu.start_date}
              onChange={(e) =>
                updateEducation(edu.id, "start_date", e.target.value)
              }
              className="bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full py-3 border border-dashed border-black/20 rounded flex items-center justify-center gap-2 hover:border-black/40 hover:bg-black/[0.02] transition-all text-sm font-medium text-black/60"
      >
        <Plus size={16} /> Add Education
      </button>
    </div>
  );
}