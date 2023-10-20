import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./profile-form.module.css";
import { PasswordData } from "./user-profile";

type ProfileFormProps = {
  onChangePassword: (passwordData: PasswordData) => void;
};

function ProfileForm(props: ProfileFormProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const oldPasswordHandler = (value: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(value.target.value);
  };

  const newPasswordHandler = (value: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(value.target.value);
  };

  const changePasswordHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredOldPassword = oldPassword;
    const enteredNewPassword = newPassword;

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });

    setOldPassword("");
    setNewPassword("");
  };

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={newPasswordHandler}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          value={oldPassword}
          onChange={oldPasswordHandler}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
