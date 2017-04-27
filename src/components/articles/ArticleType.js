import React, { Component } from "react";
import config from "../../config";

import Notizie from './Notizie';
import Foto from './Foto';
import Video from './Video';
import Default from './Default';

const ArticleType = (props) =>{
   const types ={
      'notizie' : Notizie,
      'portfolio' : Foto,
      'video' : Video,
      'default' : Default
   }
   const titleType = props.article.title_type;
   const ArticleType = types[titleType] ? types[titleType] : types.default; 
   return (
      ArticleType && <ArticleType article={props.article} />
   )
}
export default ArticleType;
