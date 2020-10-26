import { createContext } from "react";

export const AuthContext = createContext({
  userIs: "",
  //change in production
  isLoggedIn: true,
  login: () => {},
  logout: () => {},
});
