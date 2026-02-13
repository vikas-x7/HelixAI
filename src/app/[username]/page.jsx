import { useQuery } from "@tanstack/react-query";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  MapPin,
  Calendar,
  Briefcase,
  BookOpen,
  Award,
  ChevronRight,
  User,
  Code,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function PublicPortfolioPage({ params }) {
  const { username } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["public-portfolio", username],
    queryFn: async () => {
      const res = await fetch(`/api/portfolio/${username}`);
      if (!res.ok) throw new Error("Portfolio not found");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
          <div className="text-sm text-black/40 tracking-wide">Loading Portfolio...</div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-6xl mb-4">404</div>
          <div className="text-sm text-black/40">
            Portfolio not found or private.
          </div>
        </div>
      </div>
    );

  const { portfolio } = data;

  return (
    <div className="min-h-screen w-full bg-white text-black">
      {/* Header */}
      <header className="border-b border-black/10 bg-white/80 fixed top-0 w-full z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="text-sm font-bold tracking-tight hover:text-black/60 transition-colors cursor-pointer">
              {portfolio.username}
            </div>
            <nav className="hidden md:flex items-center gap-8 text-xs font-medium">
              <a href="#about" className="hover:text-black/60 transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#experience"
                className="hover:text-black/60 transition-colors relative group"
              >
                Experience
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#projects"
                className="hover:text-black/60 transition-colors relative group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#contact"
                className="hover:text-black/60 transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
          </div>
          <a
            href="#contact"
            className="text-xs font-medium border-2 border-black rounded-full px-5 py-2 hover:bg-black hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-24 px-6 lg:px-8 border-b border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-7 order-2 md:order-1">
              <div className="mb-10">
                <div className="inline-block text-[10px] font-bold text-black/50 mb-6 uppercase tracking-[0.2em] px-3 py-1 border border-black/10 rounded-full">
                  Portfolio
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.95] bg-gradient-to-br from-black to-black/60 bg-clip-text">
                  {portfolio.full_name}
                </h1>
                <p className="text-xl md:text-2xl text-black/70 max-w-2xl leading-relaxed font-light">
                  {portfolio.headline}
                </p>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <a
                  href={portfolio.github_url}
                  target="_blank"
                  className="text-black/30 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <Github size={20} />
                </a>
                <a
                  href={portfolio.linkedin_url}
                  target="_blank"
                  className="text-black/30 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={portfolio.twitter_url}
                  target="_blank"
                  className="text-black/30 hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            <div className="md:col-span-5 order-1 md:order-2">
              <div className="border-2 border-black/10 rounded-2xl overflow-hidden aspect-[3/4] bg-black/[0.02] shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-black/20 group">
                {portfolio.profile_image ? (
                  <img
                    src={portfolio.profile_image}
                    alt={portfolio.full_name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/10">
                    <User size={96} strokeWidth={1} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-8 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <div className="sticky top-36">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4">
                  About Me
                </h2>
                <div className="h-0.5 w-12 bg-black rounded-full"></div>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="text-base leading-loose space-y-6 text-black/70 font-light">
                {portfolio.about
                  ?.split("\n")
                  .map((para, i) => para.trim() && (
                    <p key={i} className="hover:text-black transition-colors duration-300">
                      {para}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 lg:px-8 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4">
              Experience
            </h2>
            <div className="h-0.5 w-12 bg-black rounded-full"></div>
          </div>

          <div className="space-y-6">
            {portfolio.experiences?.map((exp, i) => (
              <div
                key={exp.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-10 py-8 border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-all duration-300 -mx-6 px-6 rounded-xl group"
              >
                <div className="md:col-span-3">
                  <div className="text-xs font-medium text-black/50 tracking-wide">
                    {exp.start_date} — {exp.end_date || "Present"}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-black/70 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-sm text-black/60 mb-4 font-medium">{exp.company}</div>
                  <p className="text-sm text-black/60 leading-relaxed font-light">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
            {(!portfolio.experiences || portfolio.experiences.length === 0) && (
              <p className="text-sm text-black/20 italic text-center py-12">
                No experience added yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-24 px-6 lg:px-8 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4">
              Featured Projects
            </h2>
            <div className="h-0.5 w-12 bg-black rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.projects?.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                className="group border-2 border-black/10 rounded-2xl overflow-hidden hover:border-black/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="aspect-video bg-black/[0.02] relative overflow-hidden border-b-2 border-black/10">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/10">
                      <Code size={48} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight size={16} className="text-black" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold group-hover:text-black/70 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-black/60 leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.split(",").map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-medium px-3 py-1.5 border border-black/10 rounded-full text-black/60 hover:bg-black hover:text-white transition-all duration-300"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
            {(!portfolio.projects || portfolio.projects.length === 0) && (
              <p className="text-sm text-black/20 italic text-center py-12 col-span-2">
                No projects added yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-2 border-black/10 rounded-3xl p-16 text-center bg-gradient-to-br from-black/[0.02] to-transparent hover:border-black/20 transition-all duration-500 shadow-xl">
            <div className="inline-block text-[10px] font-bold text-black/50 mb-8 uppercase tracking-[0.2em] px-3 py-1 border border-black/10 rounded-full">
              Get in touch
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight max-w-3xl mx-auto leading-tight">
              Let's work together on your next project
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a
                href={`mailto:hello@${portfolio.username}.com`}
                className="text-base font-medium hover:text-black/60 transition-all duration-300 flex items-center gap-3 group hover:scale-105"
              >
                <Mail size={18} className="text-black/40 group-hover:text-black transition-colors" />
                hello@{portfolio.username}.com
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </a>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-black/20"></div>
              <a
                href="#"
                className="text-base font-medium hover:text-black/60 transition-all duration-300 flex items-center gap-3 group hover:scale-105"
              >
                <Download size={18} className="text-black/40 group-hover:text-black transition-colors" />
                Download Resume
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t border-black/10 bg-black/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-xs text-black/40 font-medium tracking-wide">
              © 2024 {portfolio.full_name}. All rights reserved.
            </div>
            <div className="flex items-center gap-8">
              <a
                href={portfolio.github_url}
                target="_blank"
                className="text-xs font-medium text-black/40 hover:text-black transition-all duration-300 relative group"
              >
                GitHub
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href={portfolio.linkedin_url}
                target="_blank"
                className="text-xs font-medium text-black/40 hover:text-black transition-all duration-300 relative group"
              >
                LinkedIn
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href={portfolio.twitter_url}
                target="_blank"
                className="text-xs font-medium text-black/40 hover:text-black transition-all duration-300 relative group"
              >
                Twitter
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}