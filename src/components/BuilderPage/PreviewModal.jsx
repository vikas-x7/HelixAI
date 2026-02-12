import { X } from "lucide-react";

export function PreviewModal({
  username,
  fullName,
  headline,
  about,
  profileImage,
  experiences,
  projects,
  skills,
  education,
  activities,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-[#0D0E12] w-full max-w-6xl h-[90vh] rounded-2xl border border-white/10 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">Portfolio Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              {profileImage && (
                <img
                  src={profileImage}
                  alt={fullName}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/10"
                />
              )}
              <h1 className="text-5xl font-bold">{fullName || "Your Name"}</h1>
              <p className="text-xl text-white/60">
                {headline || "Your headline"}
              </p>
              <p className="text-white/40 max-w-2xl mx-auto">
                {about || "Your about section"}
              </p>
            </div>

            {/* Experiences */}
            {experiences.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Experience</h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-6 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-white/60">{exp.company}</p>
                      <p className="text-sm text-white/40">
                        {exp.start_date} - {exp.end_date}
                      </p>
                      <p className="mt-4 text-white/80">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                    >
                      {proj.image_url && (
                        <img
                          src={proj.image_url}
                          alt={proj.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                        <p className="text-white/60 text-sm mb-4">
                          {proj.description}
                        </p>
                        {proj.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {proj.technologies.split(",").map((tech, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-white/10 rounded"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
