import React, { Component } from "react";
import LazySizes from "react-lazysizes";

const Rules = (props)=>{
   return (
      <div className="rules-view-wrapper">
         {props.contents.map(item => {
            return (
               <div 
                  key={item.id} 
                  className="article-preview-rules" 
                  onClick={()=>props.loadArticle(item)}
                  style={{backgroundImage:item.social_image}}
               >
               <div className="article-preview-title">
                     <h2>{item.title}
                        {item.title === 'I titoli dei quotidiani di oggi' && 
                        <span> - {item.time_absolute.value} {item.time_absolute.period}</span>
                        }
                     </h2>
                  </div>
                  
               </div>
            );
         })}
      </div>
   )
}
export default Rules;
