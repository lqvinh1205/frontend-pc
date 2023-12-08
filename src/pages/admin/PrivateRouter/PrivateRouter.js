import React from "react";
import { Navigate } from "react-router-dom";
import { getLs } from "../../../shared/ultis/localstogare";

type PrivateRouterProps = {
  children: JSX.Element;
};

const PrivateRouter = (props: PrivateRouterProps) => {
  // if(getLs('user')) {
  //     const isUser = getLs('user').user.role
  //     if(!isUser){
  //         return <Navigate to='/'/>
  //     }
  // }else {
  //     return <Navigate to='/signin'/>
  // }
  return props.children;
};

export default PrivateRouter;
