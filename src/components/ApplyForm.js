import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  TextField,
  FormHelperText,
  Paper,
} from "@material-ui/core";

// Validation.
import { useFormik } from "formik";
import * as Yup from "yup";

import { useApplyJobContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "20px auto auto",
    maxWidth: "550px",
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

export default function ApplyForm() {
  const classes = useStyles();
  const { apply, dispatch } = useApplyJobContext();

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
    initialValues: {
      name: "",
      email: "",
      age: "",
      applyjob: "",
      reason: "",
    },
    validationSchema: SigninSchema,
    onSubmit: (val) => {
      console.log("values", val);
      apply(val)
        .then((res) => {
          console.log("firebase Resolt: ", res);
          // dispatch({ type: "APPLY_SUCCESS", payload: val });
          dispatch({ type: "APPLY_SUCCESS" });
        })
        .catch((e) => console.log(e));
      formik.resetForm();
    },
  });

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Paper className="border px-5 py-5" variant="outlined" elevation={4}>
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
                    value={formik.values.name}
                    onChange={formik.handleChange}
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
                    value={formik.values.email}
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
                    value={formik.values.age}
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
                    value={formik.values.applyjob}
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
                    value={formik.values.reason}
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
              >
                申込み
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
