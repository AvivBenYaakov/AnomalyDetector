import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import "./AnomaliesTable.css";

const columns = [
  { id: "featureName", label: "Name", minWidth: 100 },
  {
    id: "span",
    label: "Spans",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "reason",
    label: "Reason",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
function specialString(arr) {
  var str = "[";
  for (var i = 0; i < arr.length; i++) {
    str = str.concat("[");
    if (arr[i] === "[") str = str.concat("[");
    else if (arr[i] === "]") str = str.concat("],");
    else if (arr[i] === ",") str = str.concat(",");
    else {
      str = str + arr[i];
    }
    if (i < arr.length - 1) str = str.concat("],");
    else str = str.concat("]");
  }
  str = str.concat("]");
  return str;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    background: "#2c77f8",
  },
  container: {
    maxHeight: 460,
  },
});
export default function AnomaliesTable({ anomalies, onRowClick }) {
  // assign to rows
  var rows = [];
  for (var key in anomalies["anomalies"]) {
    const featureName = key;
    var span = specialString(anomalies["anomalies"][key]);
    var reason;
    if (anomalies["anomalies"][key].length == 0) {
      reason = "-";
    } else {
      reason = anomalies["reason"];
    }

    rows.push({ featureName, span, reason });
  }

  var color = "#2c77f8";
  var ind = 1;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!anomalies || anomalies.length === 0) {
    return (
      <div className="placeholder">
        <h2>Please test an existing model to view the anomalies list</h2>
      </div>
    );
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: color,
                    color: "#dadada",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  // rows colors
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    style={
                      ind % 2
                        ? { background: "#4188ff" }
                        : { background: "#649eff" }
                    }
                    onClick={() => onRowClick(row.featureName)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      ind++;
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        style={{ background: color, color: "#dadada" }}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
