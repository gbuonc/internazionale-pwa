import React, { Component} from "react";
import request from "superagent";

const Now = (props)=>{
    return (
      <div>
        {this.state.contents.map(item => {
          return (
            <div key={item.post_id} className="card-view">
              <h2 className="card-title" dangerouslySetInnerHTML={{ __html: item.title }} />
              {item.img.url &&
                <div className="card-picture">
                  <img src={item.img.url} alt={item.img.alt} />
                  <p><small>{item.img.caption}</small></p>
                </div>
              }
              {item.content &&
                <div className="card-content" dangerouslySetInnerHTML={{ __html: item.content }} />}
            </div>
          );
        })}
      </div>
    );
}
export default Now;
