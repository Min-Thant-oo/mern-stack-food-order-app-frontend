import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import Spinner from "@/components/Spinner";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useAuth0 } from "@auth0/auth0-react";
import { Helmet } from "react-helmet-async";

const UserProfilePage = () => {
  const { isAuthenticated } = useAuth0();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser(isAuthenticated);
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <Spinner />;
  }

  if (!currentUser) {
    return <span>Unable to load user profile.</span>;
  }

  return (

    <>
      <Helmet>
          <title>User Profile | SolarEats</title>
          <meta name="description" content="Manage your profile settings" />
      </Helmet>

      <UserProfileForm
        currentUser={currentUser}
        onSave={updateUser}
        isLoading={isUpdateLoading}
      />
    </>
  );
};

export default UserProfilePage;