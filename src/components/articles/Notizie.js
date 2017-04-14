import React, { Component } from "react";
const Notizie =(props)=>{
   const article = props.article;
   console.log(article);
   const img = props.article.article_img;
   const author = article.author;
   const social = article.social_links;
   return(
      <div className="article-view">
         <div className="article-header">
            <picture className="article-main-image" style={{backgroundImage:`url(${img.url})`}}>
               <h5 className="article-category">{article.title_type}</h5>
            </picture>
            <div className="caption"><strong>{img.caption}</strong> <br />{img.credits}</div>
         </div>
         <div className="article-content">
            <h4 className="article-date">{article.time_absolute.value} {article.time_absolute.period}{article.story_tag && ` - ${article.story_tag}`}</h4>
            <h1 className="article-main-title">{article.title}</h1>
            <h3>{article.authors_fonte.name}, {article.authors_paese.name}</h3>
             {/*{article.time.value} {article.time.period}*/} {/*{article.datetime}*/}
             {author && (
               <div className="article-author">
                  {article.author.name}<br />
                  {article.author.brief}
                  <img src={article.author.img} alt=""/>
               </div>
             )}
             <div className="article-body">
               {article.content.data.map((content, index)=>{
                  return <span key={index} className={content.data.type} dangerouslySetInnerHTML={{__html: content.data.text}} />
               })}
             </div>
         </div>

         {/*{article.content_foto.data}
         {article.content_video.data}
         
         {social.short_url}
         {social.email}
         {social.facebook}
         {social.twitter}

         <p>{article.story_url}</p>
         <p>{article.url}</p>*/}
      </div>
   )
}
export default Notizie;
