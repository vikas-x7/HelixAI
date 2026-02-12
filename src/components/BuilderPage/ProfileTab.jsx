import { Image as ImageIcon } from "lucide-react";

export function ProfileTab({
  username,
  setUsername,
  fullName,
  setFullName,
  headline,
  setHeadline,
  about,
  setAbout,
  profileImage,
  handleImageUpload,
  uploading,
  isPublished,
  handleTogglePublish,
}) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/60">
            Username (URL)
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40"
            placeholder="johndoe"
          />
          <p className="text-[10px] text-white/40">
            Your portfolio will be at domain.com/{username}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/60">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/60">Headline</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40"
          placeholder="Senior Software Engineer @ TechCorp"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/60">About You</label>
        <textarea
          rows={6}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 resize-none"
          placeholder="Tell your story..."
        />
      </div>

      <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <ImageIcon size={24} className="text-white/40" />
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-bold">Profile Image</h4>
          <p className="text-sm text-white/40 mb-2">
            Upload a professional photo
          </p>
          <label className="text-xs font-bold text-white hover:underline cursor-pointer">
            {uploading ? "Uploading..." : "Choose File"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
        <div>
          <h4 className="font-bold">Publish Portfolio</h4>
          <p className="text-sm text-white/40">
            Make your portfolio visible to everyone
          </p>
        </div>
        <button
          onClick={handleTogglePublish}
          className={`w-12 h-6 rounded-full transition-all relative ${isPublished ? "bg-green-500" : "bg-white/20"}`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPublished ? "left-7" : "left-1"}`}
          ></div>
        </button>
      </div>
    </div>
  );
}
