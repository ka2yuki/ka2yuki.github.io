import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { useHistory } from "react-router-dom";

import {
  Container,
  Grid,
  Paper,
  Card,
  Button,
  CardContent,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Orders from "../../../components/OrdersTable";
import { makeStyles } from "@material-ui/core/styles";

import { db } from "../../../firebase-init";
import { useApplyJobContext } from "../../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  btn: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [error, setError] = useState("");
  const usersContext = useApplyJobContext();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await usersContext.logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  useEffect(() => {
    console.log("Wellcome");
  }, []);

  return (
    <>
      <Container component="main" maxWidth="md" className={classes.container}>
        <Orders />
      </Container>
      <div className="w-100 text-center mt-2">
        <strong>ログインユーザー:</strong> {usersContext.adminUser.email}
        <Button
          onClick={handleLogout}
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          Log Out
        </Button>
      </div>
    </>
  );
}
