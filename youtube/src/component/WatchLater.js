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
        const fetchPosts = [];
        for (let key in res.data) {
          fetchPosts.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ watchedlater: fetchPosts });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onDeleteVideo = (id) => {
    console.log(id);
    axios
      .delete(`https://fir-4d930-default-rtdb.firebaseio.com/posts/${id}.json`)
      .then((res) => {
        console.log('DELETED SUCCESSFULLY');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let list = null;
    if (this.state.watchedlater) {
      list = this.state.watchedlater.map((video) => (
        <div key={video.id} style={{ margin: '5px' }}>
          <div className="video-item item">
            <img
              className="ui image"
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <div className="content">
              <div className="header">{video.snippet.title}</div>
            </div>
            <button
              className="ui primary button"
              onClick={() => this.onDeleteVideo(video.id)}
            >
              REMOVE
            </button>
          </div>
        </div>
      ));
    }
    return <div className="ui relaxed divided list">{list}</div>;
  }
}

export default WatchLater;
