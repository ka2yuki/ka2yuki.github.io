import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// https://material-ui.com/components/progress/#progress

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    height: "30vh",
    alignItems: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Progress() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
