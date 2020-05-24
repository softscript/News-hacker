import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import TablePagination from "./tablePagination";
import upVoteIcon from "./../assets/img/grayArrow.gif";
import NewsDetails from "./newsDetails";
import "./tableData.css";
import Graph from "./newsVotingLineChart";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "hide",
  },
  table: {
    minWidth: 340,
  },
}));

const tableData = (props) => {
  const rows = _.get(props, "data.hits", []);
  const hiddenNewsIds = _.get(props, "hiddenNewsId", []);
  const classes = useStyles();

  let dataRows = _.compact(
    rows.map((row, index) => {
      if (!hiddenNewsIds.includes(row.objectID)) {
        return (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell align="left">{row.num_comments}</TableCell>
            <TableCell align="left">
              {props.voteCountObj[row.objectID] || 0}
            </TableCell>
            <TableCell align="left">
              <img
                className="clickable"
                onClick={() => props.handleUpVote(row.objectID)}
                src={upVoteIcon}
                alt="bb"
              ></img>
            </TableCell>
            <TableCell align="left">
              <NewsDetails
                rowData={row}
                handleHideNews={props.handleHideNews}
              />
            </TableCell>
          </TableRow>
        );
      } else {
        return null;
      }
    })
  );

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead className="table-head">
                <TableRow className="table-head-cell">
                  <TableCell align="left">SL No.</TableCell>
                  <TableCell align="left">Comments</TableCell>
                  <TableCell align="left">Vote Count</TableCell>
                  <TableCell align="left">Up Vote</TableCell>
                  <TableCell align="left">News Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{dataRows}</TableBody>
            </Table>
          </Paper>
        </Grid>

        {dataRows&&<Grid item xs={12} sm={12}>
          <Box>
            <TablePagination handlePagination={props.handlePagination} />
          </Box>
        </Grid>}
      </Grid>
      <Grid item xs={12} sm={12} className="thin-hr">
        <hr></hr>
      </Grid>
      {rows && <Grid item xs={12} sm={12}>
        <Box>
          <Graph {...props} />
        </Box>
      </Grid>
}
      <Grid item xs={12} sm={12} className="thick-hr">
        <hr></hr>
      </Grid>
    </React.Fragment>
  );
};

export default tableData;
