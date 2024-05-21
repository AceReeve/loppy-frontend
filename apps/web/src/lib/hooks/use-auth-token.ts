// hooks/useAuthToken.ts
import { useSession } from "next-auth/react";

const useAuthToken = () => {
  const { data: session } = useSession();
  return session?.jwt;
};

export default useAuthToken;
