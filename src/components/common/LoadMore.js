import React, { Component } from "react";
const LoadMore = (props) =>{
   return(
      props.enabled && (
         <div className="loadmore-wrapper">  
            <div className="btn btn-load-more" onClick={()=>props.load()}>
               ▼ Carica altro
            </div>
         </div>
      )
   )
}
export default LoadMore;
