import { createContext } from "react";

export const AuthContext = createContext({
  userIs: "",
  //change in production
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
