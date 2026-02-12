import { useUser as useClerkUser } from "@clerk/clerk-react";

const useUser = () => {
  const { user, isLoaded } = useClerkUser();

  return {
    user: user,
    data: user,
    loading: !isLoaded,
    refetch: () => user?.reload(),
  };
};

export { useUser };
export default useUser;