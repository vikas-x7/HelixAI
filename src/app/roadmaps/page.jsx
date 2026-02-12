import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Trophy,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";

export default function RoadmapsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: roadmapsData, isLoading } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const res = await fetch("/api/roadmaps");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const categories = [
    "All",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "DevOps",
  ];

  const filteredRoadmaps = roadmapsData?.roadmaps?.filter(
    (r) => activeCategory === "All" || r.category === activeCategory,
  );

  return (
    <div className="min-h-screen bg-[#0D0E12] text-white font-inter">
      {/* Header */}
      <div className="pt-32 pb-20 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-white"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              Learning Paths
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8">
            Career Roadmaps.
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            Follow structured paths curated by industry experts to master the
            technologies you need to land your dream job.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-full md:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors"
            />
            <input
              type="text"
              placeholder="Search roadmaps..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-all"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[400px] rounded-2xl bg-white/5 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoadmaps?.map((roadmap) => {
              const content =
                typeof roadmap.content === "string"
                  ? JSON.parse(roadmap.content)
                  : roadmap.content;

              return (
                <a
                  href={`/roadmaps/${roadmap.id}`}
                  key={roadmap.id}
                  className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/40 transition-all flex flex-col relative overflow-hidden"
                >
                  {/* Decorative Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors"></div>

                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <BookOpen size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {roadmap.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{roadmap.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-8 flex-1">
                    {roadmap.description}
                  </p>

                  <div className="space-y-4 mb-10">
                    {content?.slice(0, 3).map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-white/80">
                          {step.step || step.title || `Step ${idx + 1}`}
                        </span>
                      </div>
                    ))}
                    {content && content.length > 3 && (
                      <div className="text-xs text-white/40 font-bold pl-8">
                        + {content.length - 3} more steps
                      </div>
                    )}
                  </div>

                  <div className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 group-hover:translate-y-[-4px] transition-all duration-300">
                    View Roadmap <ArrowRight size={18} />
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
