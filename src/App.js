import React, {Component} from 'react'
import SlideMenu from './components/common/slide-menu'
import SwipeableViews from 'react-swipeable-views';
import request from 'superagent'

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

class App extends Component{
   constructor(){
      super();
      this.state={
         activeSlide:0,
         menu:['aaaaaa', 'bb','cccccccccc','ddddd','eeeeee','fff','ggggg','hhhhhhhhhh','iiiiiiiiiiiii'],
         contents: {
            hp: [],
            latestNews:[]
         }
      }
   }
   componentDidMount(){
      request
      .get('https://scraper-gbuonc.rhcloud.com/internazionale/data/page_element/brief.json')
      .set('Accept', 'application/json')
      .end((err, res)=>{
        const parsedContents = JSON.parse(res.text);
         console.log(parsedContents.brief.items);
         const newContents = {...this.state.contents, latestNews: parsedContents.brief.items}

         this.setState({contents:newContents})
      });
      request
            .get('https://scraper-gbuonc.rhcloud.com/internazionale/stream_data/new_items/home/0/0.json')
            .set('Accept', 'application/json')
            .end((err, res)=>{
            const parsedContents = JSON.parse(res.text);
            const newContents = {...this.state.contents, hp: parsedContents.items}
            this.setState({contents:newContents})
            });
   }
   changeSlide(currentIndex){
      this.setState({activeSlide:currentIndex})
      console.log(currentIndex)
   }
   render(){
      return <div>
         <SlideMenu activeSlide={this.state.activeSlide} menu={this.state.menu} changePage={this.changeSlide.bind(this)}/>

         
         <SwipeableViews index={this.state.activeSlide} resistance={true} onChangeIndex={(currentIndex, prevIndex)=>this.changeSlide(currentIndex, prevIndex)}>
            <div>
               <h1>Hello</h1>
            </div>
         <div>
         {this.state.contents.latestNews.map((item)=>{
            return(<div key={item.post_id}>
               <small>{item.type}</small>
               <div dangerouslySetInnerHTML={{ __html: item.content}}></div>
            </div>
            )
         })}
         </div>
          <div>
         {this.state.contents.hp.map((item)=>{
            return (
               <div key={item.id}>
                  <h6>{item.title_type}</h6>
                  <h1>{item.title}</h1>
                  <img src={item.social_image} />
                  <div dangerouslySetInnerHTML={{ __html: item.content_stream.data[0].data.text }}></div>
                 
                  <small>{parseInt(item.time_absolute.value, 10)} {item.time_absolute.period}</small>
                  {item.authors_list.length > 0 &&
                     <div>
                        {
                           item.authors_list.map((author)=>{
                              return <strong key={author.url}>{author.name}</strong> 
                           })
                        }
                     </div>
                  }
                  {item.authors_fonte.name && 
                  <div>
                     {item.authors_fonte.name}, {item.authors_paese.name}
                  </div>
                  }
                  <hr/>
               </div>
            )
         })}
         </div>
         </SwipeableViews>
      </div>
   }
}
export default App
