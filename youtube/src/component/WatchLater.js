import React, { Component } from 'react';
import axios from 'axios';

class WatchLater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchedlater: [],
    };
  }

  componentDidMount() {
    axios
      .get('https://fir-4d930-default-rtdb.firebaseio.com/posts.json')
      .then((res) => {
        console.log(res.data);
        this.setState({ watchedlater: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let list = null;
    if (this.state.watchedlater) {
      list = Object.values(this.state.watchedlater).map((video) => (
        <div key={video.id.videoId} style={{ margin: '5px' }}>
          <div className="video-item item">
            <img
              className="ui image"
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <div className="content">
              <div className="header">{video.snippet.title}</div>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div className="ui relaxed divided list">
        {list}
      </div>
    );
  }
}

export default WatchLater;
