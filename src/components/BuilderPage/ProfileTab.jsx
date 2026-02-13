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
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-black/60">
            Username (URL)
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            placeholder="johndoe"
          />
          <p className="text-[10px] text-black/40">
            Your portfolio will be at helix/{username}.com
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-black/60">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-black/60">Headline</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 transition-colors"
          placeholder="Senior Software Engineer @ TechCorp"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-black/60">About You</label>
        <textarea
          rows={6}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full bg-white border border-black/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-black/30 resize-none transition-colors"
          placeholder="Tell your story..."
        />
      </div>

      <div className="flex items-center gap-4 p-4 bg-white border border-black/10 rounded">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border border-black/10 grayscale"
          />
        ) : (
          <div className="w-14 h-14 bg-black/5 rounded-full flex items-center justify-center border border-black/10">
            <ImageIcon size={20} className="text-black/30" />
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-sm font-semibold">Profile Image</h4>
          <p className="text-xs text-black/40 mb-2">
            Upload a professional photo
          </p>
          <label className="text-xs font-medium text-black hover:text-black/60 cursor-pointer transition-colors">
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

      <div className="flex items-center justify-between p-4 bg-white border border-black/10 rounded">
        <div>
          <h4 className="text-sm font-semibold">Publish Portfolio</h4>
          <p className="text-xs text-black/40">
            Make your portfolio visible to everyone
          </p>
        </div>
        <button
          onClick={handleTogglePublish}
          className={`w-11 h-6 rounded-full transition-all relative ${isPublished ? "bg-black" : "bg-black/10"}`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${isPublished ? "left-6" : "left-1"}`}
          ></div>
        </button>
      </div>
    </div>
  );
}