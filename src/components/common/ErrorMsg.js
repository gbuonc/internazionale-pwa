import React, { Component } from "react";
const ErrorMsg = (props) =>{
   return(
      props.error && (
         <div className="error">
            <div>
               Spiacenti, si è verificato un errore:<br />
               {props.error}
            </div>
            {props.retry &&
               <div className="btn" onClick={()=>props.retry()}>Riprova</div>
            }
         </div>
      )
   )
}
export default ErrorMsg;
