import { createContext } from "react";

export const AuthContext = createContext({
  userIs: "username",
  access: "",
  //change in production
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
