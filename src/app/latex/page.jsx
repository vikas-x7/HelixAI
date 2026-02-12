import { useState } from "react";
import {
  Code,
  Play,
  Sparkles,
  Download,
  Save,
  FileText,
  Zap,
  AlertCircle,
  Loader2,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "@/utils/useUser";

export default function LatexEditor() {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const [code, setCode] = useState(
    "\\documentclass{article}\n\\begin{document}\n\\section{Education}\nYour info here...\n\\end{document}",
  );
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentDocId, setCurrentDocId] = useState(null);
  const [docTitle, setDocTitle] = useState("Untitled Document");
  const [pdfExporting, setPdfExporting] = useState(false);

  const { data: templatesData } = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const res = await fetch("/api/latex");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const { data: userDocsData } = useQuery({
    queryKey: ["user-latex-docs"],
    queryFn: async () => {
      const res = await fetch("/api/latex/docs");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({ title, content, id }) => {
      const res = await fetch("/api/latex/docs", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, id }),
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user-latex-docs"]);
      if (data.doc) {
        setCurrentDocId(data.doc.id);
        setDocTitle(data.doc.title);
      }
    },
  });

  const aiMutation = useMutation({
    mutationFn: async ({ action, code }) => {
      setAiLoading(true);
      const res = await fetch("/api/latex/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, code }),
      });
      if (!res.ok) throw new Error("AI request failed");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.result) {
        let cleanedCode = data.result;
        cleanedCode = cleanedCode.replace(/^```latex\n/gm, "");
        cleanedCode = cleanedCode.replace(/^```\n/gm, "");
        cleanedCode = cleanedCode.replace(/```$/gm, "");
        setCode(cleanedCode.trim());
      }
      setAiLoading(false);
    },
    onError: () => setAiLoading(false),
  });

  const handleAiFix = () => aiMutation.mutate({ action: "fix", code });

  const handleAiGenerate = () => {
    const promptValue = window.prompt(
      "What would you like to generate? (e.g., 'A research experience block')",
    );
    if (promptValue)
      aiMutation.mutate({ action: "generate", code: promptValue });
  };

  const handleSave = () => {
    if (currentDocId) {
      saveMutation.mutate({ title: docTitle, content: code, id: currentDocId });
    } else {
      const title = window.prompt("Enter document title:", docTitle);
      if (title) {
        saveMutation.mutate({ title, content: code });
      }
    }
  };

  const handleExportPDF = async () => {
    setPdfExporting(true);
    try {
      const res = await fetch("/api/latex/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latex: code }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${docTitle}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert("PDF export failed. Please check your LaTeX code for errors.");
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("PDF export failed. Please try again.");
    } finally {
      setPdfExporting(false);
    }
  };

  const loadDocument = (doc) => {
    setCode(doc.content);
    setCurrentDocId(doc.id);
    setDocTitle(doc.title);
  };

  return (
    <div className="h-screen bg-[#0D0E12] text-white font-inter flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <FileText size={18} className="text-black" />
            </div>
            <span className="font-bold tracking-widest">LATEX EDITOR</span>
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <input
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            className="bg-transparent border-none text-sm font-medium focus:outline-none w-48"
            placeholder="Document Title"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-green-600/10 text-green-400 border border-green-600/20 rounded-lg hover:bg-green-600/20 transition-all text-sm font-bold disabled:opacity-50"
          >
            {saveMutation.isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}{" "}
            Save
          </button>
          <button
            onClick={handleAiFix}
            disabled={aiLoading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 text-purple-400 border border-purple-600/20 rounded-lg hover:bg-purple-600/20 transition-all text-sm font-bold"
          >
            {aiLoading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Zap size={16} />
            )}{" "}
            AI Fix
          </button>
          <button
            onClick={handleAiGenerate}
            disabled={aiLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white/80 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-sm font-bold"
          >
            <Sparkles size={16} /> AI Generate
          </button>
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          <button
            onClick={handleExportPDF}
            disabled={pdfExporting}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all text-sm font-bold disabled:opacity-50"
          >
            {pdfExporting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Download size={16} />
            )}{" "}
            Export PDF
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Templates & Documents Sidebar */}
        <div className="w-72 border-r border-white/10 p-6 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">
              Templates
            </h3>
            <div className="space-y-3">
              {templatesData?.templates?.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setCode(template.content);
                    setSelectedTemplate(template.id);
                    setCurrentDocId(null);
                    setDocTitle("Untitled Document");
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedTemplate === template.id
                      ? "bg-white/10 border-white/40"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-white/40" />
                    <div>
                      <h4 className="font-bold text-sm">{template.name}</h4>
                      <p className="text-[10px] text-white/40">
                        {template.category}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">
              My Documents
            </h3>
            <div className="space-y-3">
              {userDocsData?.docs?.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => loadDocument(doc)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    currentDocId === doc.id
                      ? "bg-blue-600/10 border-blue-600/40"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-white/40" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">
                        {doc.title}
                      </h4>
                      <p className="text-[10px] text-white/40">
                        {new Date(doc.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              {(!userDocsData?.docs || userDocsData.docs.length === 0) && (
                <p className="text-xs text-white/20 italic text-center py-4">
                  No saved documents
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="h-10 border-b border-white/10 px-4 flex items-center gap-4 bg-white/[0.01]">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              {docTitle}.tex
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent p-8 font-mono text-sm leading-relaxed resize-none focus:outline-none text-white/90"
            spellCheck={false}
            placeholder="Write your LaTeX code here..."
          />
        </div>

        {/* Preview Panel */}
        <div className="w-[450px] border-l border-white/10 bg-black/40 flex flex-col">
          <div className="h-10 border-b border-white/10 px-4 flex items-center justify-between bg-white/[0.01]">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Preview
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[10px] text-green-500 font-bold uppercase">
                Live
              </span>
            </div>
          </div>
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="w-full bg-white shadow-2xl rounded p-12 text-black min-h-full">
              <LatexPreview code={code} />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}

// Simple LaTeX Preview Component
function LatexPreview({ code }) {
  const renderPreview = (latex) => {
    let html = latex;

    // Remove document class and begin/end document
    html = html.replace(/\\documentclass\{.*?\}/g, "");
    html = html.replace(/\\begin\{document\}/g, "");
    html = html.replace(/\\end\{document\}/g, "");
    html = html.replace(/\\usepackage\{.*?\}/g, "");

    // Sections
    html = html.replace(
      /\\section\{(.*?)\}/g,
      '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>',
    );
    html = html.replace(
      /\\subsection\{(.*?)\}/g,
      '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>',
    );
    html = html.replace(
      /\\subsubsection\{(.*?)\}/g,
      '<h4 class="text-lg font-bold mt-3 mb-2">$1</h4>',
    );

    // Text formatting
    html = html.replace(/\\textbf\{(.*?)\}/g, "<strong>$1</strong>");
    html = html.replace(/\\textit\{(.*?)\}/g, "<em>$1</em>");
    html = html.replace(/\\underline\{(.*?)\}/g, "<u>$1</u>");

    // Lists
    html = html.replace(
      /\\begin\{itemize\}/g,
      '<ul class="list-disc ml-6 my-3">',
    );
    html = html.replace(/\\end\{itemize\}/g, "</ul>");
    html = html.replace(
      /\\begin\{enumerate\}/g,
      '<ol class="list-decimal ml-6 my-3">',
    );
    html = html.replace(/\\end\{enumerate\}/g, "</ol>");
    html = html.replace(/\\item\s*/g, '<li class="mb-1">');

    // Line breaks
    html = html.replace(/\\\\/g, "<br/>");
    html = html.replace(/\\newline/g, "<br/>");

    // Paragraphs
    html = html
      .split("\n\n")
      .map((para) => {
        para = para.trim();
        if (
          para &&
          !para.includes("<h") &&
          !para.includes("<ul") &&
          !para.includes("<ol")
        ) {
          return `<p class="mb-3">${para}</p>`;
        }
        return para;
      })
      .join("\n");

    return html;
  };

  return (
    <div
      className="latex-preview prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: renderPreview(code) }}
    />
  );
}
