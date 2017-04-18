import React, { Component } from "react";
const Video = (props)=>{
   console.log(props.article.video_embed);
   return(
      <div>
         {props.article.video_embed.text}
      </div>
   )
}
export default Video;
