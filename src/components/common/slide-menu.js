import React, {Component} from 'react'
import ReactIScroll from 'react-iscroll'
// import iScroll from 'iscroll/build/iscroll-lite'
const iScroll = require('iscroll/build/iscroll-lite');
class SlideMenu extends Component{
   constructor(props){
      super();
      this.labels={};
   }
   render(){
      const scrollOptions={
         scrollX: true, 
         scrollY: false,
         freeScroll : true
      }
      return(
         <div className="menu-wrapper">
          <ReactIScroll className="scroll-wrapper" iScroll={iScroll} options={scrollOptions}>
             <ul className="navbar">
            {  
               this.props.menu.map((item,i, array)=>{
                  const menuLabel = this.props.menu[i];
                  return <li key={i} ref={(el)=>this.labels[menuLabel]=el}>{item}</li>
               })
            }  
            </ul>
         </ReactIScroll>
         </div>
      )
   }
}
export default SlideMenu;