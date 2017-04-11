import React, { Component } from "react";
import { ViewPager, Frame, Track, View } from "react-view-pager";

const Navbar = (props)=>{
   let labels = {}
   const changePage = (pageIndex)=>{
      props.changePage(pageIndex);
   }
   return (
      <ViewPager tag="navbar">
         <Frame className="frame">
            <Track tag="ul" viewsToShow="auto" viewsToMove={3} currentView={props.activeSlide} contain={true}>
               {props.menu.map((item, i) => {
                  const menuLabel = props.menu[i];
                  return (
                     <View tag="li" key={i} className={props.activeSlide === i ? "active" : ""}
                        ref={el => labels[menuLabel] = el}   onClick={() => changePage(i)}
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
export default Navbar;
