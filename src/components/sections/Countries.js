import React, {Component} from 'react'

class Countries extends Component{
   componentDidMount(){
      console.log('LOADED Countries')
   }
   render(){
      return <div className="section-view">Countries</div>
   }
}
export default Countries