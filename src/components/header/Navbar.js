import React, {Component} from 'react'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll.js'

class Navbar extends Component{
   constructor(props){
      super();
      this.labels={};
      this.state={
         selectedLabel:{
            offsetLeft:0,
            width:0
         }
      }
   }
   componentWillReceiveProps(props){
      this.setActiveLabel(props.activeSlide);
   }
   changePage(pageIndex){
      this.setActiveLabel(pageIndex)
      this.props.changePage(pageIndex)
   }
   setActiveLabel(labelIndex=0){
      const currentSelectedLabel = this.labels[this.props.menu[labelIndex]]
      const offsetLeft = currentSelectedLabel.offsetLeft
      const width = currentSelectedLabel.getBoundingClientRect().width
      const selectedLabel = {offsetLeft, width}
      this.setState({selectedLabel});
   }
   onRefresh(iScrollInstance){
      iScrollInstance.goToPage(this.props.activeSlide, 0 ,500)
   }
   render(){
      const scrollOptions={
         scrollX: true, 
         scrollY: false,
         snap: 'li'
      }
      const style={
         width:this.state.selectedLabel.width,
         transform:`translateX(${this.state.selectedLabel.offsetLeft}px)`,
         WebkitTransform:`translateX(${this.state.selectedLabel.offsetLeft}px)`,
         MozTransform:`translateX(${this.state.selectedLabel.offsetLeft}px)`,
      }
      return(
         <ReactIScroll 
            className="scroll-wrapper" 
            iScroll={iScroll} 
            options={scrollOptions} 
            onRefresh={(iScrollInstance)=>this.onRefresh(iScrollInstance)}>
            <navbar>
               {/*<div className="label-runner" style={style}></div>  */}         
               <ul>
                  {this.props.menu.map((item,i)=>{
                     const menuLabel = this.props.menu[i];
                     return(
                        <li key={i} 
                        className={this.props.activeSlide === i ? 'active':''}
                        ref={(el)=>this.labels[menuLabel]=el} 
                        onClick={()=>this.changePage(i)}>
                           {item}
                        </li>
                     ) 
                  })}  
               </ul>
            </navbar>
         </ReactIScroll>
      )
   }
}
export default Navbar