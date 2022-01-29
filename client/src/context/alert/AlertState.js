import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  //initial state
  const initialState = [];

  //inialise useReducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        //state.alerts is created using useReducer hook
        alerts: state.alerts,
        setAlert
      }}>
      {props.children}
    </AlertContext.Provider>
  );
};
//every component wrapped in the contactstate component now has access to the state.contacts or any method defined in value

export default AlertState;
