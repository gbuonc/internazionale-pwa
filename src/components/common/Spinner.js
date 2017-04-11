import React, { Component } from "react";
const Spinner = (props) =>{
   return(
      <span>
      {props.enabled && <div className="spinner"></div>}
      {props.error && (
         <div className="error">
            <div>
               Spiacenti, si è verificato un errore:<br />
               {props.error}
            </div>
            {props.retry &&
               <div className="btn" onClick={()=>props.retry()}>Riprova</div>
            }
         </div>
      )}
      </span>
   )
}
export default Spinner;
