import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return alerts
    ? alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <FontAwesomeIcon icon={faInfoCircle} />
          <span style={{ margin: "2px" }} />
          {alert.msg}
        </div>
      ))
    : null;
};
export default Alerts;
