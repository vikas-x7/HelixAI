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
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function PublicPortfolioPage({ params }) {
  const { username } = params;
  const theme = useTheme();

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
      <div className="h-screen flex items-center justify-center bg-[#0D0E12] text-white">
        Loading Portfolio...
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex items-center justify-center bg-[#0D0E12] text-white">
        Portfolio not found or private.
      </div>
    );

  const { portfolio } = data;

  return (
    <div
      className={`min-h-screen w-full font-inter ${theme.text.primary}`}
      style={{ background: theme.background }}
    >
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/60"></div>
              <span className="text-xs uppercase tracking-[0.4em] text-white/40">
                Introduction
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
              {portfolio.full_name?.split(" ")[0]} <br />
              <span className="text-white/40">
                {portfolio.full_name?.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-medium mb-10 max-w-lg">
              {portfolio.headline}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all"
              >
                Get In Touch
              </a>
              <div className="flex items-center gap-3 px-4 py-4 rounded-full bg-white/5 border border-white/10">
                <Github
                  size={20}
                  className="text-white/60 hover:text-white cursor-pointer transition-colors"
                />
                <Linkedin
                  size={20}
                  className="text-white/60 hover:text-white cursor-pointer transition-colors"
                />
                <Twitter
                  size={20}
                  className="text-white/60 hover:text-white cursor-pointer transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="aspect-[4/5] bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative group">
              {portfolio.profile_image ? (
                <img
                  src={portfolio.profile_image}
                  alt={portfolio.full_name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10">
                  <User size={120} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            {/* Decorative boxes */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-white/20 rounded-2xl pointer-events-none -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 border border-white/10 rounded-full pointer-events-none -z-10"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <div className="sticky top-32">
                <span className="text-[120px] font-black text-white/5 leading-none absolute -top-12 -left-4">
                  01
                </span>
                <h2 className="text-4xl font-bold relative z-10">About Me</h2>
                <div className="h-1 w-12 bg-white mt-4"></div>
              </div>
            </div>
            <div className="md:col-span-8 text-xl text-white/60 leading-relaxed space-y-6">
              {portfolio.about
                ?.split("\n")
                .map((para, i) => para.trim() && <p key={i}>{para}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-6 md:px-20 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-2">Work Experience</h2>
              <p className="text-white/40">My professional journey so far</p>
            </div>
            <span className="text-[80px] font-black text-white/5">02</span>
          </div>

          <div className="space-y-12">
            {portfolio.experiences?.map((exp, i) => (
              <div
                key={exp.id}
                className="group grid grid-cols-1 md:grid-cols-12 gap-8 p-8 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
              >
                <div className="md:col-span-3">
                  <span className="text-sm font-bold text-white/40 uppercase tracking-widest">
                    {exp.start_date} — {exp.end_date || "Present"}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 mb-4 font-medium">
                    <span>{exp.company}</span>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                    <span className="text-sm text-white/40 italic">
                      Full-time
                    </span>
                  </div>
                  <p className="text-white/60 leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
            {(!portfolio.experiences || portfolio.experiences.length === 0) && (
              <p className="text-white/20 italic">No experience added yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-2">Selected Projects</h2>
              <p className="text-white/40">Showcasing my best work</p>
            </div>
            <span className="text-[80px] font-black text-white/5">03</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.projects?.map((project) => (
              <div
                key={project.id}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all"
              >
                <div className="aspect-video bg-white/10 relative overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                      <Code size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.split(",").map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {(!portfolio.projects || portfolio.projects.length === 0) && (
              <p className="text-white/20 italic">No projects added yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-6 md:px-20 bg-white text-black">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-sm font-bold uppercase tracking-[0.4em] text-black/40 mb-8 block">
            Get in touch
          </span>
          <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter">
            Let's build something <br /> amazing together.
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a
              href={`mailto:hello@${portfolio.username}.com`}
              className="text-2xl md:text-4xl font-bold hover:underline decoration-4"
            >
              hello@{portfolio.username}.com
            </a>
            <div className="hidden md:block w-2 h-2 rounded-full bg-black/20"></div>
            <a
              href="#"
              className="text-2xl md:text-4xl font-bold hover:underline decoration-4"
            >
              Resume.pdf
            </a>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10 text-center">
        <p className="text-white/20 text-xs font-bold uppercase tracking-[0.4em]">
          Built with Portfolio AI
        </p>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}
