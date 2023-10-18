import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";

export type PasswordData = {
  oldPassword: string | undefined;
  newPassword: string | undefined;
};

function UserProfile() {
  const { data: session } = useSession();

  const changePasswordHandler = async (passwordData: PasswordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        session,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    // Change page
    console.log("changePasswordHandler", data);
  };

  return (
    <section className={classes.profile}>
      <h1>Your Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
