import React, { Component } from "react";
import request from "superagent";

class Now extends Component {
  constructor() {
    super();
    this.state = {
      contents: []
    };
  }
  componentDidMount() {
    request
      .get(
        "https://scraper-gbuonc.rhcloud.com/internazionale/data/page_element/brief.json"
      )
      .set("Accept", "application/json")
      .end((err, res) => {
        const response = JSON.parse(res.text);
        const contents = response.brief.items.map(el => {
          if (el.title === "") {
            el.title = this.parseContent(el.content).title;
            el.content = this.parseContent(el.content).content;
          }
          return el;
        });
        this.setState({ contents });
      });
  }
  parseContent(el) {
    if (!el) return;
    const temp = document.createElement("div");
    temp.innerHTML = el;
    const title = temp.querySelector("strong");
    title.parentNode.removeChild(title);
    return {
      title: title.innerHTML,
      content: temp.innerHTML
    };
  }
  render() {
    return (
      <div className="section-view">
        {this.state.contents.map(item => {
          return (
            <div key={item.post_id} className="card-view">
              <h2 className="card-title" dangerouslySetInnerHTML={{ __html: item.title }} />
              <div className="card-content" dangerouslySetInnerHTML={{ __html: item.content }} />
              {item.img.url &&
                <div className="card-picture">
                  <img src={item.img.url} alt={item.img.alt} />
                  <p><small>{item.img.caption}</small></p>
                </div>}
              {item.content &&
                <div className="card-content" dangerouslySetInnerHTML={{ __html: item.content }} />}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Now;
