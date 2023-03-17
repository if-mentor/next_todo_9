import { User } from "firebase/auth";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";

interface AuthContextProps {
  user: User | null;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (router.pathname === "/signup" || router.pathname === "/login") {
          router.push("/");
        }
      } else {
        setUser(null);
        if (router.pathname !== "/signup" || "/login") {
          router.push("/login");
        }
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
