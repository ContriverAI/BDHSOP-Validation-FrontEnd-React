import React from "react";
import CreateUser from "../../components/createUser/CreateUser";
import UpdateUser from "../../components/updateUser/UpdateUser";
import { Container } from "@material-ui/core/";
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
        <CreateUser style={{ width: "46%" }} />
        <UpdateUser style={{ width: "46%" }} />
      </Container>
    </div>
  );
}

export default Create;
