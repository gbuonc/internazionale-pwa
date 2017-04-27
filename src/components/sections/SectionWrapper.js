import React, { Component } from "react";
import request from "superagent";
import LazySizes from "react-lazysizes";
import { getItems } from "../../utils/utils";

class SectionWrapper extends Component {
   constructor() {
      super();
      this.state = {
         initialised : false
      };
   }
   componentWillReceiveProps(nextProps){
      if(!this.state.initialised){
         if(nextProps.response !== this.props.response && this.props.response){
            this.setState({initialised:true},()=>{
               this.getItemsCount();
               this.parseItems(nextProps.response);
            })
         }
      }else{
         if(nextProps.response !== this.props.response){
            this.parseItems(nextProps.response);
         }
      }
   }
   getItemsCount(){
      // call API to update total number of records, fail silently
      getItems(
         "count_items/portfolio/0.json",
         resp => this.props.updateState({totalItems:resp.tot})
      );
   }
   parseItems(resp) {
      const contents = resp.items.map(item => {
         const type = item.content_stream.data[0].type;
         const image = item.social_image;
         if (item.content_stream.data[0].data.text) {
            item.content_stream.data[0].data.text = this.removeLeggiLink(
               item.content_stream.data[0].data.text
            );
         }
         item.type = type;
         item.image = image;
         return item;
      });

      const dateTime = this.parseDateTime(resp.datetime);
      const loadedItems = this.props.loadedItems+resp.tot;
      const itemsContents = [...this.props.contents, ...contents];
      const newState = {
         loadedItems:loadedItems, 
         contents:itemsContents, 
         dateTime:dateTime
      };
      this.props.updateState(newState);
   }
   parseDateTime(dateTime){
      if(typeof(dateTime)!== 'string') return dateTime;
      // parse datetime to be used with API calls
      // from yyyy-mm-dd hh:mm:ss to yyyy-mm-dd_hh-mm-ss
      const regexp1 = /:/g;   // find semicolons
      const regexp2 = / /g;   // find spaces
      return dateTime.replace(regexp1, '-').replace(regexp2, '_');
   }
   removeLeggiLink(content) {
      const temp = document.createElement("div");
      temp.innerHTML = content;
      const links = temp.querySelectorAll("a");
      Array.prototype.forEach.call(links, function(node) {
         if (node.innerHTML === "Leggi") {
            node.parentNode.removeChild(node);
         }
      });
      return temp.innerHTML.toString();
   }
   outputClassList(item){
      const classList = ["article-preview"];
      if (!(item.type === "text" || item.type === "list")){
         classList.push("no-description");
      }
      if (item.type === "list") classList.push("list-description");
      if (!item.image || item.title_type==='le regole') classList.push("no-image");
      return classList.join(" ");
   }
   loadArticle(item){
      if(item.type === 'list') return; // disable click for list items (i titoli dei quotidiani di oggi)
      const article = this.props.contents.filter(article=> article.id===item.id);
      this.props.loadArticle(article);
   }
   render() {
      return(
         React.cloneElement(this.props.children, { 
            loadArticle: this.loadArticle.bind(this), 
            outputClassList: this.outputClassList 
         })
      )
   }
}
export default SectionWrapper;
