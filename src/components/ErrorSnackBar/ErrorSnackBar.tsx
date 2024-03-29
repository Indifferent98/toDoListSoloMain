import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../store/Store";
import { setAppErrorStatusAC } from "../../Reducers/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const CustomizedSnackbars = () => {
  const error = useSelector<AppRootStateType, null | string>(
    (state) => state.app.error
  );
  const dispatch = useDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setAppErrorStatusAC(null));
  };

  return (
    <>
      <Snackbar open={!!error} autoHideDuration={4500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
