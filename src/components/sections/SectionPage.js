import React, { Component, PureComponent } from "react";
import { View } from 'react-view-pager';
import { getItems } from "../../utils/utils";

import config from "../../config";
import Spinner from "../common/Spinner";
import SectionWrapper from "./SectionWrapper";
import ErrorMsg from "../common/ErrorMsg";
import BackToTop from "../common/BackToTop";
import LoadMore from "../common/LoadMore";

class SectionPage extends PureComponent{
   constructor() {
      super();
      this.state = {
         loading: false,
         response: null,
         contents:[],
         dateTime: 0,
         loadedItems: 0,
         totalItems: 0,
         error: null
      };
      this.loadItems = this.loadItems.bind(this);
      this.updateState = this.updateState.bind(this);
   }
   componentWillReceiveProps(nextProps){
      // load items via API first time current section slide is visible
      if(nextProps.activeSlide===this.props.slideIndex && this.state.response===null){
         this.setState({response:{}}, ()=> this.loadItems())
      }
   }
   loadItems() {
      this.setState({ loading: true, error: null }, ()=>{
         // scroll to show load spinner
         this.scrollableView.scrollTop = this.scrollableView.scrollHeight;
         getItems(
            `${this.props.apiURL}${this.state.dateTime}.json`,
            resp => this.setState({loading:false, response:resp}),
            error => this.setState({loading: false, error: error})
         );
      });
   }
   updateState(obj){
      this.setState(obj)
   }
   render(){
      const Section = this.props.page;
      const loadMore = (this.state.loadedItems > 0) && (this.state.loadedItems < this.state.totalItems);
      return (
         <View className="view-wrapper">
            <div className="section-view" ref={(el)=>this.scrollableView = el}>
               <SectionWrapper 
                  loadArticle={this.props.loadArticle} 
                  activeSlide={this.props.activeSlide} 
                  slideIndex={this.props.slideIndex}
                  updateState={this.updateState}
                  {...this.state}
               >
               <Section contents={this.state.contents} /> 
               </SectionWrapper>
               <Spinner enabled={this.state.loading}/>
               <ErrorMsg error={this.state.error} retry={this.loadItems} />
               {!this.state.loading && 
               <div className="loadmore-wrapper">  
                  <LoadMore enabled={loadMore} load={this.loadItems}/>
                  <BackToTop enabled={this.state.loadedItems > 0} el={this.scrollableView}/>
               </div>
            }
            </div>
         </View>
      )
   }
}
export default SectionPage;