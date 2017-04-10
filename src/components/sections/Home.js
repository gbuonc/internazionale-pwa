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
        const parsedContents = JSON.parse(res.text);
        this.setState({ contents: parsedContents.items });
      });
  }
  render() {
    return (
      <div className="section-view">
        {this.state.contents.map(item => {
          return (
            <div key={item.id} className="article-preview">
              <h6 className="article-category">{item.title_type}</h6>
              <picture className="article-preview-picture">
                <h3 className="article-preview-title">{item.title}</h3>
                <img src={item.social_image} />
              </picture>
              <div className="article-preview-description">
                 <div className="article-preview-date">
                     {parseInt(item.time_absolute.value, 10)}
                     {" "}
                     {item.time_absolute.period}
                  </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content_stream.data[0].data.text
                  }}
                />
              </div>
              <div className="article-preview-authors">
                {item.authors_list.length > 0 &&
                  <span>
                    {item.authors_list.map(author => {
                      return <strong key={author.url}>{author.name}</strong>;
                    })}
                  </span>}
              </div>
              <div className="article-preview-source">
                {item.authors_fonte.name &&
                  <div>
                    {item.authors_fonte.name}, {item.authors_paese.name}
                  </div>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Home;
