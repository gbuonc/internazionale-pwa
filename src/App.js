import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from "react-view-pager";

import config from "./config";
import Navbar from "./components/header/Navbar";
import SectionPage from "./components/sections/SectionPage";
import ArticleType from "./components/articles/ArticleType";

class App extends Component {
   constructor() {
      super();
      this.state = {
         activeSlide: 0,
         swiping: false,
         article: null
      };
   }
   componentDidMount() {
      // init basic router
      window.addEventListener('hashchange', ()=>{
         this.setRoute();
      }, false);
      // set landing page on loading
      window.location.hash = window.location.hash+'/' || '#/home';
   }
   getCurrentRoute(){
      const hashArray = window.location.hash.split('#/')[1].split('/');
      const sectionLabel = hashArray[0];
      const articleLabel = hashArray[1];
      return {sectionLabel, articleLabel};
   }
   setRoute(){
      const {sectionLabel, articleLabel} = this.getCurrentRoute();
      if(!articleLabel){
         // go to section view
         const sectionIndex = config.sections.map(el=>el.label.toLowerCase()).indexOf(sectionLabel);
         const index = (sectionIndex > -1) ? sectionIndex : 0;
         this.changeSlide(index, 0, 0);
      }else{
         // go to article view
      }
   }
   changeSlide(currentIndex, wait = 0, reset = 350) {
      // if(currentIndex === this.state.activeSlide) return;
      setTimeout(() => {
         this.setState({ activeSlide: currentIndex }, () => {
            window.location.hash='#/'+config.sections[currentIndex].label.toLowerCase();
            setTimeout(() => {
               this.setState({ swiping: false, article: null });
            }, reset);
         });
      }, wait);
   }
   loadArticle(article) {
      this.setState({ article: article[0] }, ()=>{
         window.location.href=window.location.hash+article[0].url;
      });
   }
   goBack(){
      window.history.back();
      //this.setState({ article: null });
   }
   render() {
      return (
         <div className="mainWrap">
            <header>
               <div className="top-header">
                  {this.state.article &&
                     <div className="go-back" onClick={() => this.goBack()}>«</div>}
                  <h1>Internazionale</h1>
               </div>
               <Navbar
                  activeSlide={this.state.activeSlide}
                  menu={config.sections.map(el => el.label)}
                  changePage={this.changeSlide.bind(this)}
               />
            </header>
            <ViewPager
               tag="section"
               className={this.state.swiping ? "swiping content" : "content"}
            >
               <Frame className="view-wrapper">
                  <Track
                     className="view-track"
                     currentView={this.state.activeSlide}
                     onSwipeMove={() => {
                        this.setState({ swiping: true });
                     }}
                     onViewChange={index => {
                        this.changeSlide(index[0], 200);
                     }}
                  >
                     {/*LOOP THROUGH PAGES (each with its own component */}
                     {config.sections.map((section, i) => {
                        return (
                           <SectionPage
                              key={section.label}
                              apiURL={section.url}
                              page={section.component}
                              loadArticle={this.loadArticle.bind(this)}
                              activeSlide={this.state.activeSlide}
                              slideIndex={i}
                           />
                        );
                     })}
                  </Track>
               </Frame>
            </ViewPager>
            {/*DETAIL VIEW ------------------------- */}
            <div className={(this.state.article ? "open" : "") + " articleDetail"}>
               {this.state.article && <ArticleType article={this.state.article} />}
            </div>
         </div>
      );
   }
}
export default App;
