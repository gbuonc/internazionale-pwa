import React, { Component } from "react";
const BackToTop = (props) =>{
   const scrollToTop = function(){
      props.el.scrollTop=0;
   }
   return( 
      props.enabled && (
         <div className="btn btn-back-to-top" onClick={()=>scrollToTop()}>
            Torna all'inizio ▲
         </div>
      )
   )
}
export default BackToTop;
