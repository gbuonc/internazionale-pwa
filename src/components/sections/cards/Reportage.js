import React, { Component } from "react";
import LazySizes from "react-lazysizes";

const Reportage = (props)=>{
   return (
      <div>
         {props.contents.map(item => {
            return (
               <div key={item.id} className={props.outputClassList(item)} onClick={()=>props.loadArticle(item)}>
                  <picture className="article-preview-picture">
                     <h5 className="article-category">{item.title_type}</h5>
                     <LazySizes dataSrc={item.social_image} />
                     <div className="article-preview-title">
                        <h2>{item.title}
                           {item.title === 'I titoli dei quotidiani di oggi' && 
                           <span> - {item.time_absolute.value} {item.time_absolute.period}</span>
                           }
                        </h2>
                     </div>
                  </picture>
                  <div
                     className="article-preview-description"
                     dangerouslySetInnerHTML={{__html: item.content_stream.data[0].data.text}}
                  />
               </div>
            );
         })}
      </div>
   )
}
export default Reportage;
