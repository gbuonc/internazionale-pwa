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
      const style={
         width:this.state.selectedLabel.width,
         transform:`translateX(${this.state.selectedLabel.offsetLeft}px)`
      }
      return(
         <div className="menu-wrapper">
            {this.props.activeSlide}
            <ReactIScroll className="scroll-wrapper" iScroll={iScroll} options={scrollOptions} onRefresh={(iScrollInstance)=>this.onRefresh(iScrollInstance)}>
               <navbar>
                  <div className="test" style={style}></div>
                  <ul className="navbar">
                     {this.props.menu.map((item,i, array)=>{
                        const menuLabel = this.props.menu[i];
                        return <li  key={i} 
                                    className={this.props.activeSlide === i ? 'active':''}
                                    ref={(el)=>this.labels[menuLabel]=el} 
                                    onClick={()=>this.changePage(i)}>
                                 {item}
                              </li>
                     })}  
                  </ul>
               
            </navbar>
         </ReactIScroll>
         </div>
      )
   }
}
export default SlideMenu;