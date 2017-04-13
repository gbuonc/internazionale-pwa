import React, { Component } from "react";
import request from "superagent";
import Spinner from "../common/Spinner";
import ErrorMsg from "../common/ErrorMsg";
import BackToTop from "../common/BackToTop";
import LoadMore from "../common/LoadMore";
import { getItems } from "../../utils/utils";

class Home extends Component {
   constructor() {
      super();
      this.state = {
         loading: false,
         contents: [],
         dateTime: 0,
         loadedItems: 0,
         totalItems: 0,
         error: null
      };
      this.loadItems = this.loadItems.bind(this);
   }
   componentDidMount() {
      this.loadItems();
   }
   loadItems() {
      this.setState({ loading: true, error: null }, ()=>{
         // scroll to show load spinner
         this.scrollableView.scrollTop = this.scrollableView.scrollHeight;
      });
      getItems(
         `items/home/0/0/${this.state.dateTime}.json`,
         resp => this.parseItems(resp),
         error => this.handleErrors(error)
      );
      // call API to update total number of records, fail silently
      if(this.state.totalItems === 0){
         getItems(
         "count_items/home/0.json",
         resp => this.setState({totalItems : resp.tot})
         );
      }
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
      this.setState((state)=>{
         const dateTime = this.parseDateTime(resp.datetime);
         const loadedItems = state.loadedItems+resp.tot;
         const itemsContents = [...this.state.contents, ...contents];
         return {loading: false, loadedItems, contents:itemsContents, dateTime}
      });
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
   handleErrors(error) {
      this.setState({loading: false, error: error});
   }
   outputClassList(item){
      const classList = ["article-preview"];
      if (!(item.type === "text" || item.type === "list")){
         classList.push("no-description");
      }
      if (item.type === "list") classList.push("list-description");
      if (!item.image) classList.push("no-image");
      return classList.join(" ");
   }
   loadArticle(id){
      // pass article object to parent
      const article = this.state.contents.filter(article=> article.id===id);
      this.props.loadArticle(article);
   }
   render() {
      const loadMore = (this.state.loadedItems > 0) && (this.state.loadedItems < this.state.totalItems);
      return (
         <div className="section-view" ref={(el)=>this.scrollableView = el}>
            {this.state.contents.map(item => {
               return (
                  <div key={item.id} className={this.outputClassList(item)} onClick={()=>this.loadArticle(item.id)}>
                     <picture className="article-preview-picture">
                        <h5 className="article-category">{item.title_type}</h5>
                        <img src={item.social_image} />
                        <div className="article-preview-title">
                           <h2>{item.title}</h2>
                        </div>
                     </picture>
                     <div
                        className="article-preview-description"
                        dangerouslySetInnerHTML={{__html: item.content_stream.data[0].data.text}}
                     />
                  </div>
               );
            })}
            <Spinner enabled={this.state.loading}/>
            <ErrorMsg error={this.state.error} retry={this.loadItems} />
            {!this.state.loading && 
               <div className="loadmore-wrapper">  
                  <LoadMore enabled={loadMore} load={this.loadItems}/>
                  <BackToTop enabled={this.state.loadedItems > 0} el={this.scrollableView}/>
               </div>
            }
         </div>
      );
   }
}
export default Home;
