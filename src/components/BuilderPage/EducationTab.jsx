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
    <div className="space-y-6">
      {education.map((edu) => (
        <div
          key={edu.id}
          className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Education Entry</h3>
            <button
              onClick={() => deleteEducation(edu.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                updateEducation(edu.id, "institution", e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
            <input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                updateEducation(edu.id, "degree", e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
            <input
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
            <input
              placeholder="Start - End (e.g., 2018 - 2022)"
              value={edu.start_date}
              onChange={(e) =>
                updateEducation(edu.id, "start_date", e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center gap-2 hover:border-white/40 transition-all"
      >
        <Plus size={20} /> Add Education
      </button>
    </div>
  );
}
