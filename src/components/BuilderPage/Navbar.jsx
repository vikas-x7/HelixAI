import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Code } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="font-[Gabarito] w-full fixed z-50 mt-[30px]">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center bg-white rounded-[30px] shadow-2xl">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8  flex items-center justify-center">
            
          </div>
          <span className="tracking-tight text-xl">
            HelixAI
          </span>
        </Link>

        <div className="flex gap-x-[100px]">
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-black transition-colors">Features</a>
            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-black transition-colors">Dashboard</Link>
            <Link to="/account/signin" className="text-sm hover:text-gray-700">Sign In</Link>
            <Link
              to="/account/signup"
              className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start px-6 pb-6 space-y-4 text-sm font-medium py-[20px] bg-white mt-2 rounded-[30px] shadow-2xl mx-6">
          <a href="#features" className="text-lg font-medium text-gray-900" onClick={() => setIsMenuOpen(false)}>Features</a>
          <Link to="/dashboard" className="text-lg font-medium text-gray-900" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          <Link to="/account/signin" className="text-lg font-medium text-gray-900" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
          <Link
            to="/account/signup"
            className="bg-black text-white px-5 py-3 rounded-lg text-center w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}