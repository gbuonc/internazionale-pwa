import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from 'react-view-pager'
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
   changeSlide(currentIndex, wait=0, reset=350) {
      setTimeout(()=>{
         this.setState({ activeSlide: currentIndex}, ()=>{
             setTimeout(()=>{
               this.setState({ swiping: false});
            }, reset)
         });
      }, wait)
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
            <ViewPager tag="section" className={this.state.swiping ? 'swiping content':'content'}>
               <Frame className="view-wrapper">
                  <Track 
                     className="view-track"
                     currentView={this.state.activeSlide}
                     onSwipeMove={()=>{this.setState({swiping:true})}}
                     onViewChange={(index)=>{this.changeSlide(index[0], 200)}}
                  >
                     <View className="view-wrapper"><Home/></View>
                     <View className="view-wrapper"><Now/></View>
                     <View className="view-wrapper"><Opinions/></View>
                     <View className="view-wrapper"><Reportage/></View>
                     <View className="view-wrapper"><Stories/></View>
                     <View className="view-wrapper"><Portfolio/></View>
                     <View className="view-wrapper"><Videos/></View>
                     <View className="view-wrapper"><Science/></View>
                     <View className="view-wrapper"><Countries/></View>
                     <View className="view-wrapper"><Rules/></View>
                  </Track>
               </Frame>
            </ViewPager>
      </div>
      );
   }
}
export default App;
