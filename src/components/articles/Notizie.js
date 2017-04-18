import React, { Component } from "react";
import LazySizes from "react-lazysizes";

const Notizie =(props)=>{
   const article = props.article;
   const hasArticleImg = props.article.article_img ? true : false;
   const img = props.article.article_img || props.article.content_foto.data[0].data;
   const author = article.author;
   const social = article.social_links;
   const articleType = article.content.data[0].type;

   return(
      <div className="article-view">
         <div className="article-header">
            <picture className="article-main-image">
               <h5 className="article-category">{article.title_type}</h5>
               <LazySizes dataSrc={img.url} alt={img.caption} />
            </picture>
            {hasArticleImg && (
               <div className="caption"><strong>{img.caption}</strong> <br />{img.credits}</div>
            )
            }
         </div>
         <div className="article-content">
            
            <h4 className="article-date">{article.time_absolute.value} {article.time_absolute.period}{article.story_tag && ` - ${article.story_tag}`}</h4>
            <h1 className="article-main-title">{article.title}</h1>
            
            {author && (
              <div className={article.author.img ? 'article-author' : 'article-author no-image'}>
                {article.author.name &&
                  <h2 className="article-author-name">
                    {article.author.name}
                    {article.author.name && article.author.brief && ', '}
                    {article.author.brief}
                  </h2>
                }
                {(article.authors_fonte || article.authors_paese) && (
                  <h3 className="article-source">
                    {article.authors_fonte.name}
                    {article.authors_fonte.name && article.authors_paese.name && ', '}
                    {article.authors_paese.name}
                  </h3>
                )}
                {article.author.img &&
                 <LazySizes className="article-author-image" width="50" height="50" dataSrc={article.author.img} alt=""/>
                }
               </div>
             )}
            
             <div className="article-body">
                {!hasArticleImg && (
                  <div>
                     {/*Use caption as article content*/}
                    <span dangerouslySetInnerHTML={{__html: img.caption}} /> <br /><strong>{img.credits}</strong>
                  </div>
               )}
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
