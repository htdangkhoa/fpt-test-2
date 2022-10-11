import React, { useLayoutEffect, useState } from "react";
import { Router } from "react-router-dom";
import { History } from "history";

export type CustomRouterProps = {
  basename?: string;
  children?: React.ReactNode;
  history: History;
};

const CustomRouter = ({ history, basename, children }: CustomRouterProps) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default CustomRouter;
