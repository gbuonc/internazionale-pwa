import React, { Component } from "react";
import config from "../../config";

import Notizie from '../articles/Notizie';
import Opinioni from '../articles/Opinioni';
import Foto from '../articles/Foto';
import Video from '../articles/Video';
import Default from '../articles/Default';

const ArticleType = (props) =>{
   const types ={
      'notizie' : Notizie,
      'opinioni' : Opinioni,
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
