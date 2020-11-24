import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TextField from "@material-ui/core/TextField";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TableFooter, TablePagination } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
function UserTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [toSearch, setToSearch] = useState("");

  const fetchData = async () => {
    const response = await axios.get("http://34.71.25.223:3000/get/userData");
    setData(response);
    setLoading(false);
    // console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ padding: "1rem" }}>
      <TextField
        style={{
          marginBottom: "0.8rem",
          width: "90%",
          marginLeft: "5%",
          position: "sticky",
        }}
        id="standard"
        label="Search"
        width="100%"
        value={toSearch}
        onChange={(e) => setToSearch(e.target.value.trim())}
        autoComplete="off"
      />
      {loading ? (
        <CircularProgress disableShrink />
      ) : (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="simple table"
            id="table-to-xls"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Access</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data
                .filter((datas) => {
                  if (toSearch == null) return datas;
                  else if (
                    datas.username
                      .toLowerCase()
                      .includes(toSearch.toLowerCase())
                  ) {
                    return datas;
                  }
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.username}>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">{row.access}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={data.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </TableContainer>
      )}
    </div>
  );
}

export default UserTable;
