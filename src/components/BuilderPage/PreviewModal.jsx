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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded border border-black/10 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
          <h2 className="text-sm font-semibold">Portfolio Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded transition-all text-black/40 hover:text-black"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
              {profileImage && (
                <img
                  src={profileImage}
                  alt={fullName}
                  className="w-24 h-24 rounded-full mx-auto object-cover border border-black/10 grayscale"
                />
              )}
              <h1 className="text-3xl font-bold">{fullName || "Your Name"}</h1>
              <p className="text-base text-black/60">
                {headline || "Your headline"}
              </p>
              <p className="text-sm text-black/40 max-w-2xl mx-auto leading-relaxed">
                {about || "Your about section"}
              </p>
            </div>

            {/* Experiences */}
            {experiences.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-black/60 mb-6">
                  Experience
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-5 bg-white border border-black/10 rounded"
                    >
                      <h3 className="text-sm font-semibold">{exp.role}</h3>
                      <p className="text-sm text-black/60">{exp.company}</p>
                      <p className="text-xs text-black/40 mt-1">
                        {exp.start_date} - {exp.end_date}
                      </p>
                      <p className="mt-3 text-sm text-black/60 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-black/60 mb-6">
                  Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white border border-black/10 rounded overflow-hidden"
                    >
                      {proj.image_url && (
                        <img
                          src={proj.image_url}
                          alt={proj.title}
                          className="w-full h-40 object-cover grayscale"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-sm font-semibold mb-2">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-black/60 mb-3 leading-relaxed">
                          {proj.description}
                        </p>
                        {proj.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {proj.technologies.split(",").map((tech, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-1 border border-black/10 rounded text-black/60"
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

            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-black/60 mb-6">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-5 bg-white border border-black/10 rounded"
                    >
                      <h3 className="text-sm font-semibold">
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-black/60">
                        {edu.degree} in {edu.field}
                      </p>
                      <p className="text-xs text-black/40 mt-1">
                        {edu.start_date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities */}
            {activities && activities.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-black/60 mb-6">
                  Activities
                </h2>
                <div className="space-y-4">
                  {activities.map((act) => (
                    <div
                      key={act.id}
                      className="p-5 bg-white border border-black/10 rounded"
                    >
                      <h3 className="text-sm font-semibold">{act.title}</h3>
                      <p className="text-sm text-black/60 mt-2 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-black/60 mb-6">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 border border-black/10 rounded text-black/60"
                    >
                      {skill.name || skill}
                    </span>
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