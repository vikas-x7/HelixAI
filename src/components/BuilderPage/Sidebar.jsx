import {
  Layout,
  User,
  Briefcase,
  Code,
  BookOpen,
  Activity,
  Save,
  Globe,
  Loader2,
  Eye,
} from "lucide-react";

export function Sidebar({
  activeTab,
  setActiveTab,
  onSave,
  isSaving,
  onPreview,
  username,
}) {
  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "projects", label: "Projects", icon: <Layout size={18} /> },
    { id: "education", label: "Education", icon: <BookOpen size={18} /> },
    { id: "activities", label: "Activities", icon: <Activity size={18} /> },
  ];

  return (
    <div className="w-full md:w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col gap-2">
      <div className="mb-8 flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <Layout size={18} className="text-black" />
        </div>
        <span className="font-bold tracking-widest">BUILDER</span>
      </div>

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            activeTab === tab.id
              ? "bg-white text-black font-bold"
              : "hover:bg-white/10 text-white/60"
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}

      <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-4">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="w-full bg-white/10 border border-white/20 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}{" "}
          Save Changes
        </button>
        <button
          onClick={onPreview}
          className="w-full bg-purple-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700"
        >
          <Eye size={18} /> Preview
        </button>
        <a
          href={`/${username}`}
          target="_blank"
          className="w-full bg-blue-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 text-center"
        >
          <Globe size={18} /> View Public
        </a>
      </div>
    </div>
  );
}
