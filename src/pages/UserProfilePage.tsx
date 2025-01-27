import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import Spinner from "@/components/shared/Spinner";
import UserProfileForm from "@/components/shared/user-profile-form/UserProfileForm";
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
        <title>User Profile | Manage Account Settings | SolarEats | MIN THANT OO | minthantoo.com</title>
        <meta name="description" content="Manage your SolarEats profile settings. Update personal information, preferences, and account details to enhance your experience. SolarEats | MIN THANT OO | minthantoo.com" />
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