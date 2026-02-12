import { useQuery } from "@tanstack/react-query";
import {
  Layout,
  Settings,
  ExternalLink,
  Eye,
  ChevronRight,
  FileText,
  BookOpen,
  Plus,
  ArrowRight,
  Code,
} from "lucide-react";
import useUser from "@/utils/useUser";

export default function DashboardPage() {
  const { data: user } = useUser();

  const { data: portfolioData, isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch("/api/portfolio");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#0D0E12] text-white">
        Loading...
      </div>
    );

  const portfolio = portfolioData?.portfolio;

  return (
    <div className="min-h-screen bg-[#0D0E12] text-white font-inter">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Hello, {user?.name?.split(" ")[0] || "there"}!
            </h1>
            <p className="text-white/40">
              Welcome to your portfolio command center.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/builder"
              className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Plus size={18} /> Edit Portfolio
            </a>
            <a
              href={portfolio ? `/${portfolio.username}` : "#"}
              className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <ExternalLink size={18} /> View Public
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
              Portfolio Status
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {portfolio?.is_published ? "Published" : "Draft"}
              </span>
              <div
                className={`w-3 h-3 rounded-full ${portfolio?.is_published ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]" : "bg-white/20"}`}
              ></div>
            </div>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
              LaTeX Resumes
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">2 Documents</span>
              <FileText size={24} className="text-white/20" />
            </div>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
              Roadmap Progress
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">1 Active</span>
              <BookOpen size={24} className="text-white/20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/latex"
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Code size={20} />
                </div>
                <div>
                  <h3 className="font-bold">LaTeX Editor</h3>
                  <p className="text-xs text-white/40 mt-1">
                    Craft your professional resume
                  </p>
                </div>
              </a>
              <a
                href="/roadmaps"
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Roadmaps</h3>
                  <p className="text-xs text-white/40 mt-1">
                    Plan your career growth
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Checklist */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-bold mb-8">Setup Progress</h2>
            <div className="space-y-6">
              {[
                { label: "Create account", done: true },
                { label: "Set up basic profile", done: !!portfolio },
                {
                  label: "Add work experience",
                  done: portfolio?.experiences?.length > 0,
                },
                {
                  label: "Publish your portfolio",
                  done: portfolio?.is_published,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${item.done ? "bg-white border-white text-black" : "border-white/20"}`}
                  >
                    {item.done && <ChevronRight size={14} />}
                  </div>
                  <span
                    className={`text-sm font-medium ${item.done ? "text-white" : "text-white/40"}`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}
