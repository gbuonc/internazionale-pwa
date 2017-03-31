import React, {Component} from 'react'
import request from 'superagent'

class Home extends Component{
   constructor(){
      super();
      this.state={
         contents:[]
      }
   }
   componentWillMout(){
      console.log('WILL')
   }
   componentDidMount(){
      console.log('DID')
      request
      .get('https://scraper-gbuonc.rhcloud.com/internazionale/stream_data/new_items/home/0/0.json')
      .set('Accept', 'application/json')
      .end((err, res)=>{
         const parsedContents = JSON.parse(res.text);
         this.setState({contents:parsedContents.items})
      });
   }
   render(){
      return(
         <div className="section-view">  
            {this.state.contents.map((item)=>{
               return (
                  <div key={item.id}>
                     <div>
                        <h6>{item.title_type}</h6>
                        <h3>{item.title}</h3>
                     </div>
                     <img src={item.social_image} />
                        <div dangerouslySetInnerHTML={{ __html: item.content_stream.data[0].data.text }}></div>
                        <small>{parseInt(item.time_absolute.value, 10)} {item.time_absolute.period}</small>
                        {item.authors_list.length > 0 &&
                           <div>
                           {item.authors_list.map((author)=>{
                              return <strong key={author.url}>{author.name}</strong> 
                              })}
                           </div>
                        }
                        {item.authors_fonte.name && 
                           <div>
                              {item.authors_fonte.name}, {item.authors_paese.name}
                           </div>
                        }
                     
                  </div>
               )
            })}
         </div>
      ) 
   }
}

export default Home