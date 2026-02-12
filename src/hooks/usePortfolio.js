import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "@/utils/useUser";

export function usePortfolio() {
  const queryClient = useQueryClient();
  const { data: userData } = useUser();

  const [portfolioId, setPortfolioId] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [activities, setActivities] = useState([]);

  const { data: portfolioData, isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch("/api/portfolio");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.portfolio) {
        const p = data.portfolio;
        setPortfolioId(p.id);
        setUsername(p.username || "");
        setFullName(p.full_name || "");
        setHeadline(p.headline || "");
        setAbout(p.about || "");
        setProfileImage(p.profile_image || "");
        setIsPublished(p.is_published || false);
        setExperiences(p.experiences || []);
        setSkills(p.skills || []);
        setProjects(p.projects || []);
        setEducation(p.education || []);
        setActivities(p.activities || []);
      } else {
        setUsername(userData?.email?.split("@")[0] || "");
        setFullName(userData?.name || "");
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newData) => {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create");
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["portfolio"]);
      setPortfolioId(data.portfolio.id);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (newData) => {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["portfolio"]);
    },
  });

  const handleSave = async () => {
    const data = {
      id: portfolioId,
      username,
      full_name: fullName,
      headline,
      about,
      profile_image: profileImage,
      is_published: isPublished,
      experiences,
      skills,
      projects,
      education,
      activities,
    };

    if (portfolioId) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return {
    isLoading,
    portfolioId,
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
    isSaving: updateMutation.isPending || createMutation.isPending,
  };
}
