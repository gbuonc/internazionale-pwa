import React, {Component} from 'react'

class Videos extends Component{
   componentDidMount(){
      console.log('LOADED VIDEOS')
   }
   componentWillReceiveProps(nextProps){
      console.log(nextProps.activeSlide, this.props.slideIndex);
   }
   render(){
      return <div className="section-view">Videos</div>
   }
}
export default Videos