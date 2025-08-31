import { useEffect, useState } from "react";
import { getProfile } from "../services/userServices";
import NavExit from "../components/NavExit/NavExit";
import TabBar from "../components/TabBar/TabBar";
import UserArticlesList from "../components/UserArticleList/UserArticlesList";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const result = await getProfile(userId);
    if (result.success) {
      setProfile(result.data);
    } else {
      console.error("Erro ao buscar perfil:", result.error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <>
      <NavExit />
      <div className="profile-header">
        <h1>{profile.user.name}</h1>
        <p>{profile.user.bio}</p>
      </div>

      <UserArticlesList userId={profile.user.id} />

      <TabBar />
    </>
  );
}
