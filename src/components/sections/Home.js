import React, { Component } from "react";
import request from "superagent";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      contents: []
    };
  }
  componentDidMount() {
    request
      .get(
        "https://scraper-gbuonc.rhcloud.com/internazionale/stream_data/new_items/home/0/0.json"
      )
      .set("Accept", "application/json")
      .end((err, res) => {
        const parsedContents = this.parseArticlesPreview(JSON.parse(res.text));
        this.setState({ contents: parsedContents });
      });
  }
  parseArticlesPreview(articles) {
    const parsedContents = articles.items.map(article => {
      const type = article.content_stream.data[0].type;
      const image = article.social_image;
      if(article.content_stream.data[0].data.text){
         article.content_stream.data[0].data.text = this.removeLeggiLink(
         article.content_stream.data[0].data.text
         );
      }
      article.type = type;
      article.image = image;
      return article;
    });
    return parsedContents;
  }
  removeLeggiLink(content) {
    const temp = document.createElement("div");
    temp.innerHTML = content;
    const links = temp.querySelectorAll("a");
    Array.prototype.forEach.call(links, function(node) {
      if(node.innerHTML==='Leggi'){
         node.parentNode.removeChild(node);
      }
   });
    return temp.innerHTML.toString();
  }

  render() {
    return (
      <div className="section-view">
        {this.state.contents.map(item => {
          // add css Classes
          const classList = ["article-preview"];
          if (!(item.type === "text" || item.type === "list"))
            classList.push("no-description");
          if (item.type === "list") classList.push("list-description");
          if (!item.image) classList.push("no-image");
          // -----------------
          return (
            <div key={item.id} className={classList.join(" ")}>

              {/* <div className="article-preview-date">
                  {parseInt(item.time_absolute.value, 10)}
                  {" "}
                  {item.time_absolute.period}
              </div> */}
              <picture className="article-preview-picture">
                <h5 className="article-category">{item.title_type}</h5>
                <img src={item.social_image} />
                <div className="article-preview-title">
                  <h2>{item.title}</h2>
                </div>
              </picture>

              <div
                className="article-preview-description"
                dangerouslySetInnerHTML={{
                  __html: item.content_stream.data[0].data.text
                }}
              />

            </div>
          );
        })}
      </div>
    );
  }
}
export default Home;
