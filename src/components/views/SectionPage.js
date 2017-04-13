import React, { Component } from "react";
import { View } from 'react-view-pager';
class SectionPage extends Component{
   shouldComponentUpdate(nextProps, nextState){
      return nextProps.activeSlide !== this.props.activeSlide;
   }
   render(){
      const Section = this.props.page;
      return (
         <View className="view-wrapper">
            <Section 
               loadArticle={this.props.loadArticle} 
               activeSlide={this.props.activeSlide} 
               slideIndex={this.props.slideIndex}
            />
         </View>
      )
   }
}
export default SectionPage;