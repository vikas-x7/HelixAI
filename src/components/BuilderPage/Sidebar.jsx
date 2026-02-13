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
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
    { id: "skills", label: "Skills", icon: <Code size={16} /> },
    { id: "projects", label: "Projects", icon: <Layout size={16} /> },
    { id: "education", label: "Education", icon: <BookOpen size={16} /> },
    { id: "activities", label: "Activities", icon: <Activity size={16} /> },
  ];

  return (
    <div className="w-full md:w-64 bg-white border-r border-black/10 p-6 flex flex-col gap-1">
      <div className="mb-6 pb-4 border-b border-black/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
            <Layout size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold tracking-wider">BUILDER</span>
        </div>
      </div>

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-all ${
            activeTab === tab.id
              ? "bg-black text-white font-medium"
              : "hover:bg-black/5 text-black/60"
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}

      <div className="mt-auto pt-6 border-t border-black/10 flex flex-col gap-3">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="w-full border border-black/10 py-2.5 rounded text-sm flex items-center justify-center gap-2 hover:border-black/30 hover:bg-black/5 disabled:opacity-50 transition-all font-medium"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}{" "}
          Save Changes
        </button>
        <button
          onClick={onPreview}
          className="w-full bg-black text-white py-2.5 rounded text-sm flex items-center justify-center gap-2 hover:bg-black/90 transition-all font-medium"
        >
          <Eye size={16} /> Preview
        </button>
        <a
          href={`/${username}`}
          target="_blank"
          className="w-full border border-black py-2.5 rounded text-sm flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all text-center font-medium"
        >
          <Globe size={16} /> View Public
        </a>
      </div>
    </div>
  );
}