import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import LazySizes from "react-lazysizes";

const Foto = (props)=>{
   const article = props.article;
   const author = article.author;
   const portfolioDesc = article.content_foto.data[1].data.text;
   const portfolioPics = article.content_foto.data[0].data.imgs;
   console.log(article)
   return(
      <div className="article-view portfolio-view">
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
         </div>
            <ViewPager className="portfolio-swiper">
            <Frame className="view-wrapper" autoSize={true}>
               <Track className="view-track" infinite contain={true}>
                  {portfolioPics.map((img, i)=>{
                     return (
                     <View key={img.img_url}>
                     <LazySizes dataSrc={img.img_url} alt={img.caption} />
                     <small className="portfolio-caption">{img.caption} {img.credits}</small>
                     </View>
                     )
                     })}
               </Track>
            </Frame>
         </ViewPager>
         <div className="article-content">
             <div className="article-body" dangerouslySetInnerHTML={{__html: portfolioDesc}} />
         </div>
      </div>
   )
}
export default Foto;
