import React, {Component} from 'react'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll'
class SlideMenu extends Component{
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
      console.log(props)
      this.setActiveLabel(props.activeSlide);
   }
   changePage(pageIndex){
      this.setActiveLabel(pageIndex)
      this.props.changePage(pageIndex)
   }
   setActiveLabel(labelIndex){
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
      return(
         <div className="menu-wrapper">
            {this.props.activeSlide}
            <ReactIScroll className="scroll-wrapper" iScroll={iScroll} options={scrollOptions} onRefresh={(iScrollInstance)=>this.onRefresh(iScrollInstance)}>
               <navbar>
                  <ul className="navbar">
                     {this.props.menu.map((item,i, array)=>{
                        const menuLabel = this.props.menu[i];
                        return <li key={i} ref={(el)=>this.labels[menuLabel]=el} onClick={()=>this.changePage(i)}>{item}</li>
                     })}  
                  </ul>
               <div className="test" style={{'width':this.state.selectedLabel.width, 'left':this.state.selectedLabel.offsetLeft}}></div>
            </navbar>
         </ReactIScroll>
         </div>
      )
   }
}
export default SlideMenu;