import React, { Component } from "react";
class Notizie extends Component{
   constructor(){
      super();
   }
   render(){
      return <div>Notizie</div>;
      /*const article = this.props.children[0];
      console.log(this.props.children)
      return(
         <div className="section-view">
            <h6>{article.title_type} {article.story_tag}</h6>
            <h1>{article.title}</h1>
            {article.time.value} {article.time.period}
            <hr />
            {article.time_absolute.value} {article.time_absolute.period}
            {article.datetime}
            {article.author.name}<br />
            {article.author.brief}
            <img src={article.author.img} alt=""/>
            <hr />
            {article.content.data.map(content=>{
               return <span dangerouslySetInnerHTML={{__html: content.data.text}} />
            })}
            {article.content_foto.data}
            {article.content_video.data}
            <img src={article.image} alt=""/>
            {article.social_links.short_url}
            {article.social_links.email}
            {article.social_links.facebook}
            {article.social_links.twitter}

            <p>{article.story_url}</p>
            <p>{article.url}</p>
         </div>
      )*/
   }
}
export default Notizie;
