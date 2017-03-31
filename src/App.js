import React, {Component} from 'react'
import SwipeableViews from 'react-swipeable-views'
import { StickyContainer, Sticky } from 'react-sticky'
import request from 'superagent'

import config from './config'
import Navbar from './components/header/Navbar'
import Home from './components/sections/Home'
import Now from './components/sections/Now'
import Opinions from './components/sections/Opinions'
import Reportage from './components/sections/Reportage'
import Stories from './components/sections/Stories'
import Portfolio from './components/sections/Portfolio'
import Videos from './components/sections/Videos'
import Science from './components/sections/Science'
import Countries from './components/sections/Countries'
import Rules from './components/sections/Rules'


class App extends Component{
   constructor(){
      super();
      this.state={
         activeSlide:0,
         sections: config.sections,
         autoHeight: false
      }
   }
   changeSlide(currentIndex){
      this.setState({activeSlide:currentIndex, autoHeight: true})
   }
   render(){
      return(
         <StickyContainer>
            <header>
               <div className="top-header">
                  <h1>Internazionale</h1>
               </div>
                <Sticky style={{zIndex: 3}}>
                  <Navbar 
                  activeSlide={this.state.activeSlide} 
                  menu={this.state.sections.map((el)=>el.label)} 
                  changePage={this.changeSlide.bind(this)}
                  />
               </Sticky>
            </header>

            <SwipeableViews   
            index={this.state.activeSlide} 
            resistance={true} 
            onChangeIndex={(currentIndex, prevIndex)=>this.changeSlide(currentIndex, prevIndex)} 
            animateHeight={this.state.autoHeight}
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
         </StickyContainer>
      )
   }
}
export default App
