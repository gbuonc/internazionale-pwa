import React, {Component} from 'react'
import request from 'superagent'

class Now extends Component{
   constructor(){
      super();
      this.state={
         contents:[]
      }
   }
   componentDidMount(){
      request
      .get('https://scraper-gbuonc.rhcloud.com/internazionale/data/page_element/brief.json')
      .set('Accept', 'application/json')
      .end((err, res)=>{
        const parsedContents = JSON.parse(res.text);
         console.log(parsedContents.brief.items);
         this.setState({contents:parsedContents.brief.items})
      })
   }
   render(){
      return(
         <div className="section-view">  
            {this.state.contents.map((item)=>{
               return(
                  <div key={item.post_id}>
                     <small>{item.type}</small>
                     <div dangerouslySetInnerHTML={{ __html: item.content}}></div>
                  </div>
               )
            })}
         </div>
      ) 
   }
}

export default Now