import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import request from "superagent";

import config from "./config";
import Navbar from "./components/header/Navbar";
import Home from "./components/sections/Home";
import Now from "./components/sections/Now";
import Opinions from "./components/sections/Opinions";
import Reportage from "./components/sections/Reportage";
import Stories from "./components/sections/Stories";
import Portfolio from "./components/sections/Portfolio";
import Videos from "./components/sections/Videos";
import Science from "./components/sections/Science";
import Countries from "./components/sections/Countries";
import Rules from "./components/sections/Rules";

class App extends Component {
   constructor() {
      super();
      this.state = {
         activeSlide: 0,
         sections: config.sections,
         swiping: false
      }
   }
   componentDidMount(){
      /*this.content.addEventListener('touchmove', ()=>{
         this.setState({swiping:true})
      })*/
      /*this.content.addEventListener('touchend', ()=>{
         this.setState({swiping:false})
      })*/
   }
   changeSlide(currentIndex) {
      this.setState({ activeSlide: currentIndex});
   }
   render() {
      return (
         <div className="mainWrap">
            <header>
               <div className="top-header"><h1>Internazionale</h1></div>
               <Navbar
               activeSlide={this.state.activeSlide}
               menu={this.state.sections.map(el => el.label)}
               changePage={this.changeSlide.bind(this)}
               />
            </header>
            <section className={this.state.swiping ? 'swiping content' : 'content'} ref={(content)=>this.content=content}>
               <SwipeableViews
               index={this.state.activeSlide}
               resistance={true}
               onSwitching={()=>this.setState({swiping:true})}
               onTransitionEnd={()=>this.setState({swiping:false})}
               onChangeIndex={(currentIndex, prevIndex) =>
               this.changeSlide(currentIndex, prevIndex)}
               >
                  <Home />
                  <Now />
                  <Opinions />
                  <Reportage />
                  <Stories />
                  <Portfolio />
                  <Videos />
                  <Science />
                  <Countries />
                  <Rules />
               </SwipeableViews>
            </section>
         </div>
      );
   }
}
export default App;
