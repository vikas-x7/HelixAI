import {
  ArrowRight,
  Code,
  Layout,
  Sparkles,
  Globe,
  BookOpen,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme"; // Path is correct here (src/app -> src/hooks)

export default function LandingPage() {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: "Portfolio Builder",
      description:
        "Build a professional portfolio without touching a line of code. Just fill in your details.",
      icon: <Layout size={24} className="text-white" />,
    },
    {
      title: "LaTeX Editor",
      description:
        "Create stunning PDF resumes using our prebuilt LaTeX templates or your own custom code.",
      icon: <Code size={24} className="text-white" />,
    },
    {
      title: "AI Assistant",
      description:
        "Fix LaTeX errors and generate content blocks instantly with our advanced AI integration.",
      icon: <Sparkles size={24} className="text-white" />,
    },
    {
      title: "Public Link",
      description:
        "Get a custom link like domain.com/username to share your portfolio with the world.",
      icon: <Globe size={24} className="text-white" />,
    },
    {
      title: "Learning Roadmaps",
      description:
        "Follow curated paths to master new technologies and boost your career growth.",
      icon: <BookOpen size={24} className="text-white" />,
    },
  ];

  return (
    <div
      className={`min-h-screen w-full font-inter ${theme.text.primary}`}
      style={{ background: theme.background }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0E12]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Code size={18} className="text-black" />
            </div>
            <span className="font-bold tracking-widest text-lg">
              PORTFOLIO.AI
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#roadmaps"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Roadmaps
            </a>
            <a href="/account/signin" className="text-sm font-semibold">
              Sign In
            </a>
            <a
              href="/account/signup"
              className="bg-white text-black px-5 py-2 rounded-lg text-sm font-bold hover:bg-white/90 transition-all"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#0D0E12] border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            <a
              href="#features"
              className="text-lg text-white/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#roadmaps"
              className="text-lg text-white/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Roadmaps
            </a>
            <a
              href="/account/signin"
              className="text-lg text-white/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </a>
            <a
              href="/account/signup"
              className="bg-white text-black px-5 py-3 rounded-lg text-center font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-8">
            <Sparkles size={12} className="text-white" />
            <span>AI-Powered Portfolio Builder</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Build Your Future <br />
            <span className="text-white/40">In Minutes.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Create a professional web portfolio and LaTeX resume with ease. No
            coding required. Share your work globally with a custom link.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/account/signup"
              className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-[0.98] transition-all"
            >
              Start Building Free <ArrowRight size={20} />
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need
            </h2>
            <div className="h-1 w-20 bg-white"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-extrabold mb-2">10k+</div>
            <div className="text-white/40 uppercase tracking-widest text-xs">
              Portfolios Created
            </div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">500+</div>
            <div className="text-white/40 uppercase tracking-widest text-xs">
              LaTeX Templates
            </div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">24/7</div>
            <div className="text-white/40 uppercase tracking-widest text-xs">
              AI Assistance
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <Code size={12} className="text-black" />
            </div>
            <span className="font-bold tracking-widest text-sm">
              PORTFOLIO.AI
            </span>
          </div>

          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a
              href="mailto:hello@portfolio.ai"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="text-white/40 text-xs">
            © 2026 Portfolio AI. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}
