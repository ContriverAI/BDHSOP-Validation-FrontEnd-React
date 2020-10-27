import React from "react";
import CreateUser from "../../components/createUser/CreateUser";
import UpdateUser from "../../components/updateUser/UpdateUser";
import { Container } from "@material-ui/core/";
import UserTable from "../../components/userTable/UserTable";
function Create() {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "auto",
      }}
    >
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "70%",
          height: "auto",
          padding: "0.8rem",
        }}
      >
        <UserTable />
      </Container>
      <Container
        style={{
          // justifyContent: "center",
          // alignItems: "center",
          display: "flex",
          width: "50%",
          height: "auto",
          flexDirection: "column",
        }}
      >
        <CreateUser style={{ width: "40%" }} />
        <UpdateUser style={{ width: "40%" }} />
      </Container>
    </div>
  );
}

export default Create;
