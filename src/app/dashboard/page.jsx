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
  ChevronDown,
  MoreVertical,
} from "lucide-react";
// import useUser from "@/utils/useUser";

import { useUser, useClerk } from "@clerk/clerk-react";



export default function DashboardPage() {
  // const { data: user } = useUser();
  const { user } = useUser();


  const { data: portfolioData, isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch("/api/portfolio");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-sm text-black/40">Loading...</div>
      </div>
    );

  const portfolio = portfolioData?.portfolio;
    const { signOut } = useClerk();

  return (

    
    <div className="min-h-screen bg-white text-black ">
     

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-12 flex justify-between">

          <div>

          <h1 className="text-3xl mb-2">
            Hi, {user.fullName}
          </h1>
          <p>Deserunt quis aperiam nam labore inventore soluta est,</p>
          </div>

          <div>
                 <button
        onClick={() => signOut()}
        className="bg-black/80 text-white px-4 py-1 rounded"
      >
        Logout
      </button>
          </div>
        </div>

       
      

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-8 border-b border-black/10">
          <div className="flex gap-6">
            <button className="pb-3 text-sm border-b-2 border-black font-medium">
              Overview
            </button>
          
          </div>
          <div className="flex items-center gap-3 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search portfolio..."
                className="text-xs border border-black/10 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-black/30 transition-colors w-64"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-black/30">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="7" cy="7" r="4.5"/>
                  <path d="M11 11l3 3"/>
                </svg>
              </div>
            </div>
            <button className="text-xs border border-black/10 rounded px-3 py-2 hover:border-black/30 transition-colors flex items-center gap-2">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h8M3 10h8"/>
              </svg>
              Filters
            </button>
            <a
              href="/builder"
              className="bg-black text-white px-4 py-2 rounded text-xs font-medium flex items-center gap-2 hover:bg-black/90 transition-colors"
            >
              <Plus size={14} /> Edit Portfolio
            </a>
          </div>
        </div>

        {/* Stats Table */}
        <div className="border border-black/10 rounded overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10 bg-black/[0.02]">
                <th className="text-left py-3 px-4 text-xs font-medium text-black/60">
                  <button className="flex items-center gap-1 hover:text-black transition-colors">
                    Name <ChevronDown size={12} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-black/60">
                  <button className="flex items-center gap-1 hover:text-black transition-colors">
                    Status <ChevronDown size={12} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-black/60">Role</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-black/60">Documents</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-black/60">Progress</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {/* User Profile Row */}
              <tr className="border-b border-black/10 hover:bg-black/[0.02] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <button className="text-black/30 hover:text-black transition-colors">
                      <ChevronRight size={14} />
                    </button>
                    <div>
                      <div className="text-sm font-medium">{user?.name || "Portfolio User"}</div>
                      <div className="text-xs text-black/40">{user?.email || "user@example.com"}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${portfolio?.is_published ? "bg-black" : "bg-black/20"}`}></div>
                    <span className="text-xs">{portfolio?.is_published ? "Published" : "Draft"}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-xs">
                    <div>Portfolio Owner</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-xs">
                    <FileText size={14} className="text-black/40" />
                    <span>2 Documents</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs">{portfolio?.is_published ? "Active" : "Pending setup"}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="relative group">
                    <button className="text-black/40 hover:text-black transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* LaTeX Documents Row */}
              <tr className="border-b border-black/10 hover:bg-black/[0.02] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <button className="text-black/30 hover:text-black transition-colors">
                      <ChevronRight size={14} />
                    </button>
                    <div>
                      <div className="text-sm font-medium">LaTeX Resume</div>
                      <div className="text-xs text-black/40">Professional documents</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <span className="text-xs">Active</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-xs">Document creator</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-xs">
                    <Code size={14} className="text-black/40" />
                    <span>LaTeX format</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs">Ready</span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-black/40 hover:text-black transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>

              {/* Roadmap Row */}
              <tr className="border-b border-black/10 hover:bg-black/[0.02] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <button className="text-black/30 hover:text-black transition-colors">
                      <ChevronRight size={14} />
                    </button>
                    <div>
                      <div className="text-sm font-medium">Career Roadmap</div>
                      <div className="text-xs text-black/40">Growth planning</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <span className="text-xs">Active</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-xs">Career planner</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-xs">
                    <BookOpen size={14} className="text-black/40" />
                    <span>1 Active plan</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs">In progress</span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-black/40 hover:text-black transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>

              {/* Experience Row */}
              <tr className="hover:bg-black/[0.02] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <button className="text-black/30 hover:text-black transition-colors">
                      <ChevronRight size={14} />
                    </button>
                    <div>
                      <div className="text-sm font-medium">Work Experience</div>
                      <div className="text-xs text-black/40">{portfolio?.experiences?.length || 0} entries</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${portfolio?.experiences?.length > 0 ? "bg-black" : "bg-black/20"}`}></div>
                    <span className="text-xs">{portfolio?.experiences?.length > 0 ? "Complete" : "Incomplete"}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-xs">Profile section</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-xs text-black/40">-</div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-xs">{portfolio?.experiences?.length > 0 ? "Updated" : "Needs attention"}</span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-black/40 hover:text-black transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Setup Checklist */}
        <div className="border border-black/10 rounded p-6 bg-white">
          <h2 className="text-sm font-bold mb-6">Setup Progress</h2>
          <div className="space-y-4">
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
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    item.done
                      ? "bg-black border-black"
                      : "border-black/20 hover:border-black/40"
                  }`}
                >
                  {item.done && (
                    <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2">
                      <path d="M2 6l3 3 5-6" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-xs ${
                    item.done ? "text-black" : "text-black/40"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/latex"
            className="border border-black/10 rounded p-6 hover:border-black/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <Code size={16} />
              </div>
              <ArrowRight size={16} className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold mb-1">LaTeX Editor</h3>
            <p className="text-xs text-black/40">
              Craft your professional resume
            </p>
          </a>
          <a
            href="/roadmaps"
            className="border border-black/10 rounded p-6 hover:border-black/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <BookOpen size={16} />
              </div>
              <ArrowRight size={16} className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-sm font-bold mb-1">Roadmaps</h3>
            <p className="text-xs text-black/40">
              Plan your career growth
            </p>
          </a>
        </div>

        {/* Public Portfolio Link */}
        {portfolio && (
          <div className="mt-8 border border-black/10 rounded p-6 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold mb-1">Public Portfolio</div>
              <div className="text-xs text-black/40">
                Share your work with the world
              </div>
            </div>
            <a
              href={`/${portfolio.username}`}
              className="border border-black text-black px-4 py-2 rounded text-xs font-medium flex items-center gap-2 hover:bg-black hover:text-white transition-all"
            >
              View Public <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}