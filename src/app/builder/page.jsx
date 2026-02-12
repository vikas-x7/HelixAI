import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import useUpload from "@/utils/useUpload";
import { usePortfolio } from "@/hooks/usePortfolio";
import { Sidebar } from "@/components/BuilderPage/Sidebar";
import { ProfileTab } from "@/components/BuilderPage/ProfileTab";
import { ExperienceTab } from "@/components/BuilderPage/ExperienceTab";
import { SkillsTab } from "@/components/BuilderPage/SkillsTab";
import { ProjectsTab } from "@/components/BuilderPage/ProjectsTab";
import { EducationTab } from "@/components/BuilderPage/EducationTab";
import { ActivitiesTab } from "@/components/BuilderPage/ActivitiesTab";
import { PreviewModal } from "@/components/BuilderPage/PreviewModal";

export default function BuilderPage() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPreview, setShowPreview] = useState(false);

  const {
    isLoading,
    username,
    setUsername,
    fullName,
    setFullName,
    headline,
    setHeadline,
    about,
    setAbout,
    profileImage,
    setProfileImage,
    isPublished,
    setIsPublished,
    experiences,
    setExperiences,
    skills,
    setSkills,
    projects,
    setProjects,
    education,
    setEducation,
    activities,
    setActivities,
    handleSave,
    isSaving,
  } = usePortfolio();

  const { upload, uploading } = useUpload();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0D0E12] text-white">
        Loading...
      </div>
    );
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file);
    setProfileImage(url);
  };

  const handleTogglePublish = () => {
    setIsPublished(!isPublished);
    setTimeout(() => handleSave(), 100);
  };

  return (
    <div className="min-h-screen bg-[#0D0E12] text-white font-inter flex flex-col md:flex-row">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSave={handleSave}
        isSaving={isSaving}
        onPreview={() => setShowPreview(true)}
        username={username}
      />

      <div className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 flex justify-between items-center">
            <h1 className="text-3xl font-bold capitalize">{activeTab}</h1>
          </div>

          {activeTab === "profile" && (
            <ProfileTab
              username={username}
              setUsername={setUsername}
              fullName={fullName}
              setFullName={setFullName}
              headline={headline}
              setHeadline={setHeadline}
              about={about}
              setAbout={setAbout}
              profileImage={profileImage}
              handleImageUpload={handleImageUpload}
              uploading={uploading}
              isPublished={isPublished}
              handleTogglePublish={handleTogglePublish}
            />
          )}

          {activeTab === "experience" && (
            <ExperienceTab
              experiences={experiences}
              setExperiences={setExperiences}
            />
          )}

          {activeTab === "skills" && (
            <SkillsTab skills={skills} setSkills={setSkills} />
          )}

          {activeTab === "projects" && (
            <ProjectsTab projects={projects} setProjects={setProjects} />
          )}

          {activeTab === "education" && (
            <EducationTab education={education} setEducation={setEducation} />
          )}

          {activeTab === "activities" && (
            <ActivitiesTab
              activities={activities}
              setActivities={setActivities}
            />
          )}
        </div>
      </div>

      {showPreview && (
        <PreviewModal
          username={username}
          fullName={fullName}
          headline={headline}
          about={about}
          profileImage={profileImage}
          experiences={experiences}
          projects={projects}
          skills={skills}
          education={education}
          activities={activities}
          onClose={() => setShowPreview(false)}
        />
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}
