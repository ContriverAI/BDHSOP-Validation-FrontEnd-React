import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TextField from "@material-ui/core/TextField";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, TableFooter, TablePagination } from "@material-ui/core";
import "./ViewData.css";
import PopUp from "../popUp/PopUp";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function ViewData(props) {
  const auth = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popUp, setPopUp] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [toSearch, setToSearch] = useState("");
  const refresh = () => {
    setLoading(true);
    fetchData();
  };

  const fetchData = async () => {
    const response = await axios.get("https://validation-bdshop-backend.herokuapp.com/get/recordData");
    setData(response);
    setLoading(false);
    console.log(data);
    // alert("clicked");
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(data.data);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // console.log(toSearch);
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "ValidationBDSHOP";
    const headers = [
      [
        "TIME",
        "RECORDED BY",
        "ORDER NUMBER",
        "TRANSACTION ID",
        "UTR",
        "AMOUNT",
      ],
    ];

    const dataTable = data.data.map((elt) => [
      new Date(elt.TimeStamp).toDateString(),
      elt.username,
      elt.ord_number,
      elt.trans_id,
      elt.utr,
      elt.Amount,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: dataTable,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };
  const searchTable = () => {
    return data.data.filter(
      (datas) =>
        datas.username
          .toString()
          .toLowerCase()
          .includes(toSearch.toString().toLowerCase()) ||
        datas.ord_number
          .toString()
          .toLowerCase()
          .includes(toSearch.toString().toLowerCase()) ||
        datas.trans_id
          .toString()
          .toLowerCase()
          .includes(toSearch.toString().toLowerCase())
      // ||
      // datas.utr
      //   .toString()
      //   .toLowerCase()
      //   .includes(toSearch.toString().toLowerCase())
    );
  };

  return (
    <div>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        {/* <p>Access : </p> {auth.accessIs} */}
        <Button
          onClick={refresh}
          variant="contained"
          style={{ backgroundColor: "#fdb900" }}
          className={classes.button}
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
        <Button
          onClick={() => setPopUp(!popUp)}
          variant="contained"
          style={{ backgroundColor: "#fdb900" }}
          className={classes.button}
          startIcon={<EditIcon />}
        >
          Record Update/Delete
        </Button>
      </Container>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <CircularProgress disableShrink />
        ) : (
          <TableContainer component={Paper}>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                {auth.accessIs !== "limited" && (
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "30%",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#fdb900" }}
                      className={classes.button}
                    >
                      <CSVLink
                        data={data.data}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        DOWNLOAD CSV
                      </CSVLink>
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#fdb900" }}
                      className={classes.button}
                      onClick={exportPDF}
                    >
                      DOWNLOAD PDF
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#fdb900", color: "black" }}
                      className={classes.button}
                    >
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="DOWNLOAD XLS"
                      />
                    </Button>
                  </div>
                )}
              </div>
              {/* <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                COPY TO CLIPBOARD
              </Button> */}
              <div
                style={{ width: "15%", display: "flex", alignItems: "center" }}
              >
                <TextField
                  style={{ marginBottom: "0.8rem" }}
                  id="standard"
                  label="Search"
                  width="60%"
                  value={toSearch}
                  onChange={(e) => setToSearch(e.target.value.trim())}
                  autoComplete="off"
                />
              </div>
            </div>
            <Table
              className={classes.table}
              aria-label="simple table"
              id="table-to-xls"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="left">Recorded By</TableCell>
                  <TableCell align="left">Order Number</TableCell>
                  <TableCell align="left">Transaction ID</TableCell>
                  <TableCell align="left">UTR</TableCell>
                  <TableCell align="left">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data &&
                  searchTable()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => (
                      <TableRow key={i}>
                        <TableCell align="left">
                          {new Date(row.TimeStamp).toDateString()}
                        </TableCell>
                        <TableCell align="left">
                          {new Date(row.TimeStamp).toLocaleTimeString()}
                        </TableCell>
                        {/* <TableCell align="left">
                        {moment(row.TimeStamp).fromNow(true)} ago
                      </TableCell> */}
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.ord_number}</TableCell>
                        <TableCell align="left">{row.trans_id}</TableCell>
                        <TableCell align="left">{row.utr}</TableCell>

                        <TableCell align="left">{row.Amount}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100, 500, 1000]}
                  colSpan={3}
                  count={searchTable().length}
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
      </Container>

      {popUp ? null : (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.8)",
            width: "100%",
            top: "0",
            height: "100vh",
            overflow: "hidden",
            margin: "auto",
            zIndex: "0",
          }}
        >
          <PopUp
            close={() => setPopUp(!popUp)}
            dataReload={fetchData}
            loader={refresh}
          />
        </div>
      )}
    </div>
  );
}

export default ViewData;
