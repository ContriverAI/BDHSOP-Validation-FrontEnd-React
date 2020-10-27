import React from "react";
import CreateUser from "../../components/createUser/CreateUser";
import UpdateUser from "../../components/updateUser/UpdateUser";
import { Container } from "@material-ui/core/";
import UserTable from "../../components/userTable/UserTable";
function Create() {
  return (
    <div>
      <Container
        fixed
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100%",
          height: "80vh",
        }}
      >
        <CreateUser style={{ width: "48%" }} />
        <UpdateUser style={{ width: "48%" }} />
        <UserTable />
      </Container>
    </div>
  );
}

export default Create;
