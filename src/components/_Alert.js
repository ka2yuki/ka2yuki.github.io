import { useEffect, useState } from "react";
import { useApplyJobContext } from "../contexts/AuthContext";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

const _Alert = () => {
  const store = useApplyJobContext();
  // firebase Result.
  const { success } = store.usersState;
  // Snacbar State.
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  // 登録完了したか.
  useEffect(() => {
    success
      ? setState({ ...state, open: true })
      : setState({ ...state, open: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const handleClose = () => {
    setState({ ...state, open: false });
    store.dispatch({ type: "APPLY_SUCCESS_RESET" });
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message="I love snacks"
      key={vertical + horizontal}
    >
      <Alert severity="success" onClose={handleClose}>
        送信完了しました!
      </Alert>
    </Snackbar>
  );
};

export default _Alert;
