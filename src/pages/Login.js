import React, { useState } from "react";
import firebase from "../firebase-init";
// Components
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  Box,
  Container,
  Input,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// Validation.
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [errorState, setError] = useState("");
  const history = useHistory();

  // firebase database to Save
  const saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("必須項目です"),
    password: Yup.string().required("必須項目です"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      console.log("values of onSubmit in Loginjs.", values);
      // setState(...sate, { loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((signedUser) => {
          console.log("resLogin:", signedUser);
          console.log("✅ Goto dashboard.");
          // after login.
          history.push("/dashboard");
          console.log("history pushed!! to  Dashboard.");
        })
        .catch((err) => {
          console.log("errers", err.message);
          setError(err.message);
          console.log("after set errers:", errorState);
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          【ログインページ】
        </Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <InputLabel>Email</InputLabel>
                </Grid>
                <Grid item xs={true}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                </Grid>
                <Grid item xs={true}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                ログイン
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body2" gutterBottom color="error">
          {errorState && errorState}
        </Typography>
      </div>
    </Container>
  );
}
