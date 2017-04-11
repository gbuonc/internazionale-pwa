import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from "react-view-pager";

class Navbar extends Component {
   constructor(props) {
      super();
      this.labels = {};
   }
   changePage(pageIndex) {
      this.props.changePage(pageIndex);
   }
   render() {
      return (
         <ViewPager tag="navbar">
            <Frame className="frame">
               <Track tag="ul" viewsToShow="auto" viewsToMove={3} currentView={this.props.activeSlide} contain={true}>
                  {this.props.menu.map((item, i) => {
                     const menuLabel = this.props.menu[i];
                     return (
                        <View
                           tag="li"
                           key={i}
                           className={this.props.activeSlide === i ? "active" : ""}
                           ref={el => this.labels[menuLabel] = el}
                           onClick={() => this.changePage(i)}
                        >
                           {item}
                        </View>
                     );
                  })}
               </Track>
            </Frame>
         </ViewPager>
      );
   }
}
export default Navbar;
