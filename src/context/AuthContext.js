import { createContext } from "react";

export const AuthContext = createContext({
  userIs: "",
  access: "",
  //change in production
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
