import { useQuery } from "@tanstack/react-query";
import { BookOpen, Check, ChevronLeft, Circle } from "lucide-react";

export default function RoadmapDetailPage({ params }) {
  const { id } = params;

  const { data, isLoading } = useQuery({
    queryKey: ["roadmap", id],
    queryFn: async () => {
      const res = await fetch(`/api/roadmaps/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0E12] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  const roadmap = data?.roadmap;

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-[#0D0E12] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Roadmap not found</h1>
          <a
            href="/roadmaps"
            className="text-white/60 hover:text-white underline"
          >
            Back to Roadmaps
          </a>
        </div>
      </div>
    );
  }

  const content =
    typeof roadmap.content === "string"
      ? JSON.parse(roadmap.content)
      : roadmap.content;

  return (
    <div className="min-h-screen bg-[#0D0E12] text-white font-inter">
      {/* Header */}
      <div className="pt-32 pb-20 px-6 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <a
            href="/roadmaps"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ChevronLeft size={20} /> Back to Roadmaps
          </a>
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <BookOpen size={32} />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">
                {roadmap.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                {roadmap.title}
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
                {roadmap.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-6">
          {content &&
            content.map((step, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-lg font-bold group-hover:bg-white group-hover:text-black transition-all">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">
                      {step.step || step.title || `Step ${idx + 1}`}
                    </h3>
                    {step.description && (
                      <p className="text-white/60 leading-relaxed mb-6">
                        {step.description}
                      </p>
                    )}
                    {step.resources && step.resources.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest">
                          Resources
                        </h4>
                        <div className="space-y-2">
                          {step.resources.map((resource, ridx) => (
                            <a
                              key={ridx}
                              href={resource.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {resource.name || resource.title}
                                </span>
                                <span className="text-xs text-white/40">
                                  {resource.type || "Link"} →
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    {step.skills && step.skills.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-3">
                          Skills to Learn
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {step.skills.map((skill, sidx) => (
                            <span
                              key={sidx}
                              className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}
