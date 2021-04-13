import React, { useState } from "react";
import firebase from "../firebase-init";
// Components
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  CssBaseline,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import signUpWithEmailPassword from "../api/email";

// Validation.
import { useFormik } from "formik";
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

export default function SignUp() {
  const classes = useStyles();
  const initialState = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };
  const [state, setState] = useState(initialState);

  const handleUpdateErrors = (errors) => {
    this.setState(...state, state.errors);
  };

  const handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (isSignInFormValid(this.state, this.handleUpdateErrors)) {
    this.setState({ errors: [], loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((signedUser) => {
        console.log(signedUser);
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false,
        });
      });
    // }
  };

  // firebase database to Save
  const saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  // const { email, password, errors, loading } = this.state;

  // name: Yup.string()
  //   .min(2, "短すぎます")
  //   .max(50, "長すぎます")
  //   .required("必須項目です"),
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
      alert(JSON.stringify(values, null, 2));
      console.log("values", values);
      setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((signedUser) => {
          console.log("resoult SignUP!:", signedUser);
          setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          setState({
            errors: state.errors.concat(err),
            loading: false,
          });
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Button onClick={() => signUpWithEmailPassword()}>text</Button>
        <Typography component="h1" variant="h5">
          【管理者登録ページ】
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
                登録
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
