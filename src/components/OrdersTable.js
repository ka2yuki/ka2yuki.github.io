import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../firebase-init";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  LinearProgress,
} from "@material-ui/core";
import Progress from "./Progress";

import { useApplyJobContext } from "../contexts/AuthContext";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  seeMore: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const history = useHistory();

  const { getUsers, dispatch, usersState } = useApplyJobContext();

  useEffect(() => {
    console.log("Active: useEffect in OrdersTable.js!");
    getUsers().then((snap) => {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: snap.docs.map((d) => d.data()),
      });
      console.log("firest Dispatch", usersState);
    });
  }, []);
  return (
    <>
      <Typography component="h1" variant="h5" className={classes.title}>
        【エントリー一覧】
      </Typography>
      {usersState.loading ? (
        <Progress />
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>氏名</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>[詳細]</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersState.users
              ? usersState.users.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <a
                        href={`/detail/${i}`}
                        onClick={(e) => {
                          e.preventDefault();
                          Promise.all([
                            dispatch({
                              type: "ADD_DOCUMENT_USER_ID",
                              payload: row.id,
                            }),
                            history.push(`/detail/${i}`),
                          ]);
                        }}
                      >
                        ［詳細］
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              : "no"}
          </TableBody>
        </Table>
      )}
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          ＜ 前へ
        </Link>
        <Link color="primary" href="#" onClick={preventDefault}>
          次へ ＞
        </Link>
      </div>
    </>
  );
}
