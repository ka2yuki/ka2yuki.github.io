import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import { db } from "../../../firebase-init";
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
  Typography,
  Box,
  Container,
  Input,
  FormHelperText,
} from "@material-ui/core";

// validation
import { useFormik } from "formik";
import * as Yup from "yup";

import { useApplyJobContext } from "../../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "20px auto auto",
  },
  label: {
    width: "20%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  ageField: {
    width: "30%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  applyJob: {
    "& .MuiInput-input ": { height: "180px" },
  },
}));

const Detail = () => {
  const [user, setUser] = useState({});
  const { params_uid } = useParams();
  const location = useLocation();
  const history = useHistory();
  const {
    current_user_documentID,
    updateUser,
    usersState,
    dispatch,
    deleteUser,
  } = useApplyJobContext();
  const classes = useStyles();

  async function handleUpdateUser() {
    try {
      await updateUser(current_user_documentID, user);
      history.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteUser() {
    try {
      await deleteUser(current_user_documentID);
      history.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }

  //uidで指定したメンバーの値を取得
  const getUserDetail = (uid) => {
    console.log("uid is:", uid);
    const docRef = db.collection("users").doc(uid);
    console.log("docRef", docRef);
    // const doc = await
    return docRef.get();
  };

  // 現在の user の DocumentID から 個人詳細 を 取得する。
  useEffect(() => {
    console.log("current_user_documentID", current_user_documentID);
    try {
      getUserDetail(current_user_documentID).then((doc) => {
        console.log("doc", doc);
        console.log("getUserDetail_Doc", doc.data());
        //ドキュメントの存在確認
        if (doc.exists) {
          setUser(doc.data());
          dispatch({ type: "ADD_CUREENT_USER_DETAIL", payload: doc.data() });
          console.log("userState", user);
        } else {
          //なければ404ページへ
          history.push("/404");
        }
      });
      console.log("user (local)", user);
      console.log("usersState", usersState.userDetail);
    } catch (e) {
      console.log(e);
    }
    console.log("params_uid", params_uid);
    console.log("location", location);
  }, []);

  const SigninSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "短すぎます")
      .max(50, "長すぎます")
      .required("必須項目です"),
    email: Yup.string().email("Invalid email").required("必須項目です"),
    age: Yup.number().required("必須項目です"),
    applyjob: Yup.string().required("必須項目です"),
    reason: Yup.string().required("必須項目です"),
  });
  const formik = useFormik({
    initialValues: user,
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      console.log("values", values);
      updateUser(current_user_documentID, user);
    },
  });

  return (
    <Container component="main" maxWidth="xs" className=" px-6 py-4 mt-5">
      <Typography className="pt-4 text-center" component="h1" variant="h5">
        【エントリー詳細】
      </Typography>
      <div className={`mt-4 ${classes.paper}`}>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Grid container spacing={2} justify="center">
            {/* 氏名 */}
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <InputLabel htmlFor="name">氏名</InputLabel>
                </Grid>
                <Grid item xs={true}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    type="name"
                    value={user.name}
                    // value={user.name}
                    onChange={(e) => {
                      setUser({ ...user, name: `${e.target.value}` });
                      console.log("object", user);
                    }}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Email */}
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
                    value={user.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Age */}
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <InputLabel htmlFor="age">年齢</InputLabel>
                </Grid>
                <Grid item xs={true} className="d-flex align-items-center ">
                  <TextField
                    // fullWidth
                    id="age"
                    name="age"
                    type="age"
                    value={user.age}
                    onChange={formik.handleChange}
                    error={formik.touched.age && Boolean(formik.errors.age)}
                    helperText={formik.touched.age && formik.errors.age}
                  />
                  <span>歳</span>
                </Grid>
              </Grid>
            </Grid>

            {/* Apply Job */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <InputLabel htmlFor="applyjob">希望職種</InputLabel>
                </Grid>
                <Grid item xs={true}>
                  <Select
                    fullWidth
                    id="applyjob"
                    name="applyjob"
                    value={user.applyjob}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.applyjob && Boolean(formik.errors.applyjob)
                    }
                  >
                    <MenuItem value={"フロントエンド"}>フロントエンド</MenuItem>
                    <MenuItem value={"バックエンド"}>バックエンド</MenuItem>
                    <MenuItem value={"インフラ"}>インフラ</MenuItem>
                  </Select>
                  <FormHelperText error={formik.touched.applyjob}>
                    {formik.touched.applyjob && formik.errors.applyjob}
                  </FormHelperText>
                </Grid>
              </Grid>
            </Grid>

            {/* 希望理由 */}
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center" rows={6}>
                <Grid item xs={3}>
                  <InputLabel htmlFor="reason">希望理由</InputLabel>
                </Grid>
                <Grid item xs={true}>
                  <TextField
                    fullWidth
                    size="medium"
                    rows={6}
                    id="reason"
                    name="reason"
                    type="reason"
                    value={user.reason}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.reason && Boolean(formik.errors.reason)
                    }
                    className={`border border-primary ${classes.applyJob}`}
                    // style={}
                  />
                  <FormHelperText error={formik.touched.reason}>
                    {formik.touched.reason && formik.errors.reason}
                  </FormHelperText>
                </Grid>
              </Grid>
            </Grid>

            {/* Send BTN */}
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleUpdateUser}
              >
                更新する
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleDeleteUser}
              >
                削除する
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Link to="/dashboard">
        <div className="mt-5 text-center">
          <Button fullWidth variant="contained" color="">
            一覧へ戻る
          </Button>
        </div>
      </Link>
    </Container>
  );
};

export default Detail;
