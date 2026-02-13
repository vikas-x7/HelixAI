import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Menu, X, Code } from "lucide-react";
import Navbar from "../components/BuilderPage/Navbar";

export default function LandingPage() {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: "Portfolio",
      desc: "Design, customize, and deploy your portfolio with one click",
      img: "https://cdn-icons-png.flaticon.com/128/10453/10453141.png",
    },
    {
      title: "Resume",
      desc: "Smart resumes, powered by LaTeX and AI.",
      img: "https://cdn-icons-png.flaticon.com/128/9386/9386860.png",
    },
    {
      title: "Road map ",
      desc: "Create personalized learning roadmaps to master skills faster.",
      img: "https://cdn-icons-png.flaticon.com/128/17145/17145905.png",
    },
    {
      title: "Apply job",
      desc: "Find the right job and apply instantly with just one click",
      img: "https://cdn-icons-png.flaticon.com/128/10490/10490250.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-gray-900  overflow-x-hidden">
      {/* Navigation */}
    <Navbar />

      {/* Hero Section */}
      <section className="bg-[#F7F7F7] relative flex flex-col md:flex-row items-center max-w-6xl  px-5 mx-auto py-16 font-[Gabarito] gap-8 h-screen ">

      <div className="flex-1 relative z-10 ">

        <div className="mb-12">
          <p className="text-sm text-[#666666] mb-8 mt-[40px]"> <i className="ri-instance-fill"></i> Easiest way to build your portfolio, resume, and apply to jobs</p>
          <h1 className="text-4xl md:text-6xl text-gray-900 mb-6 -tracking-[2px]">
            <span className="text-[#666666] ">The simple way to</span> <br />
            portfolio resume apply
          </h1>

          <div className="flex gap-4 mt-[20px]">
            <Link to="/dashboard" className="bg-black text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition inline-block text-center flex items-center">
              Dashboard
            </Link>
            <button className="bg-white border border-gray-300 text-black px-6 rounded-lg shadow hover:bg-gray-100 transition">
              Create website
            </button>
          </div>
        </div>


        <div className="flex flex-col md:flex-row gap-[40px] mt-[100px]">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start text-start rounded-lg w-[230px] py-2"
            >

              <h3 className="text-[18px] mb-2 flex items-center">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-5 h-5 mr-2 "
                />
                {feature.title} <i className="ri-arrow-right-line ml-[75px]"></i>
              </h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
      <div className="absolute inset-0 -z-1">
        <img
          className="h- object-cover translate-x-[390px]"
          src="https://cdn.prod.website-files.com/6812d02840d393aa2c663370/6847f9fe57cfb544f7d5818a_hero-home.svg"
          alt="Hero Background"
        />
      </div>

    </section>

        <section className=" bg-[#F7F7F7] font-[Gabarito]">
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-12 pt-[130px] text-center ">

        <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 ">
          Unify your career journey with a modern platform
        </h2>
        <p className="text-gray-600">
          From building skills to landing your dream job, manage every step of your career
          path in one unified system. Create portfolios, build resumes,
          track applications, and master new skills with full visibility
          from start to finish.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <video className="w-full h-auto rounded-lg" autoPlay muted loop>
          <source
            src="https://www.pexels.com/download/video/3254194/"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-80">


        <div className="max-w-6xl mx-auto py-16 px-4 md:px-8 flex flex-col md:flex-row gap-12">
          <div className="flex-1 font-[Gabarito]">
            <p className="text-gray-500  mb-2">Flexible by design</p>
            <h2 className="text-4xl  mb-4">Every career path, covered</h2>
            <p className="text-gray-600 mb-6">
              Support any career goal — freelancing, full-time jobs, internships, or academic pursuits — and automate your applications with a flexible engine
              that scales with your ambition.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div>
                <p className="font-semibold">Alex River</p>
                <p className="text-gray-500 text-sm">Software Engineer @TechCorp</p>
              </div>
            </div>
            <blockquote className="text-gray-600 italic mb-4">
              “Standard templates didn’t work for my niche — now I have the
              flexibility I need and the freedom to showcase my true skills.”
            </blockquote>
            <a href="#" className="text-blue-600 font-medium hover:underline">
              How Alex landed the job →
            </a>
          </div>

          <div className="relative w-1/2 h-[350px]">
            <img
              className="w-full h-full object-cover "
              src="https://images.unsplash.com/photo-1752061159819-f290b8f48b08?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-16 px-4 md:px-8 flex flex-col md:flex-row gap-20 mt-40">
          <div className="relative w-1/2 h-[350px] flex ">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1752061462018-6b3cef2330db?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>

          <div className="flex-1 font-[Gabarito]">
            <p className="text-gray-500  mb-2">Designed for growth</p>
            <h2 className="text-4xl  mb-4">Every skill level, supported</h2>
            <p className="text-gray-600 mb-6">
              Whether you are a beginner or a pro, track your learning progress, manage certifications, and showcase your achievements with a platform that grows with you.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div>
                <p className="font-semibold">Jordan Lee</p>
                <p className="text-gray-500 text-sm">Product Designer @CreativeStudio</p>
              </div>
            </div>
            <blockquote className="text-gray-600 italic mb-4">
              “I needed a way to track my learning roadmaps — this platform gave me the structure and insights I was missing.”
            </blockquote>
            <a href="#" className="text-blue-600 font-medium hover:underline">
              See Jordan's roadmap →
            </a>
          </div>
        </div>


      </div>

      <div className="relative  py-20 text-center h-screen font-[Gabarito] flex items-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl -tracking-[2px] mb-1">
            Designed for success, loved for simplicity
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            We provide the tools you need to build a standout portfolio and resume.
            Join our community and start your journey today.
          </p>

          <Link
            to="/dashboard"
            className="inline-block bg-black text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-gray-100  hover:text-black transition"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <Code size={12} className="text-white" />
            </div>
            <span className="font-bold tracking-tight text-sm">
              HelixAI
            </span>
          </div>

          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="mailto:hello@helixai.com" className="hover:text-black transition-colors">Contact</a>
          </div>

          <div className="text-gray-400 text-xs">
            © 2026 HelixAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
