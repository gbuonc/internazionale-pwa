import React, { Component } from "react";
import LazySizes from "react-lazysizes";

const Opinions = (props)=>{
   return (
      <div>
         {props.contents.map(item => {
            return (
               <div key={item.id} className="article-preview article-preview-opinions" onClick={()=>props.loadArticle(item)}>
                  <div className="article-preview-opinions-title-wrapper">
                     {item.author.img &&
                     <div>
                     <LazySizes className="article-author-image" width="50" height="50" dataSrc={item.author.img} alt=""/>
                     </div>
                     }
                     <div>
                        <h2 className="article-preview-title">{item.title}</h2>
                        {item.author && (
                           <div className="article-author no-image">
                              {item.author.name &&
                                 <h3 className="article-author-name">
                                 {item.author.name}
                                 {item.author.name && item.author.brief && ', '}
                                 {item.author.brief}
                                 </h3>
                              }
                              {(item.authors_fonte || item.authors_paese) && (
                                 <h3 className="article-source">
                                 {item.authors_fonte.name}
                                 {item.authors_fonte.name && item.authors_paese.name && ', '}
                                 {item.authors_paese.name}
                                 </h3>
                              )}
                           </div>
                        )}
                     </div>
                  </div>
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

export default Opinions;
