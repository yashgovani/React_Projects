import React, { Component } from 'react';
import youtube from './Apis/youtube';
import SearchBar from './component/SearchBar';
import VideoDetails from './component/VideoDetails';
import VideoList from './component/VideoList';
import axios from 'axios';
//import Navbar from './component/Navbar';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
    };
  }

  componentDidMount() {
    this.onTermSubmit('child story');
  }

  onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
      },
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  onAddWatchLater = (video) => {
    axios
      .post('https://fir-4d930-default-rtdb.firebaseio.com/posts.json', video)
      .then((res) => {
        console.log('Successful');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <div className="ui container" style={{ marginTop: '20px' }}>
          <SearchBar onFormSubmit={this.onTermSubmit} />
          <div className="ui grid">
            <div className="ui row">
              <div className="eleven wide column">
                <VideoDetails
                  video={this.state.selectedVideo}
                  onAddWatchLater={this.onAddWatchLater}
                />
              </div>
              <div className="five wide column">
                <VideoList
                  videos={this.state.videos}
                  onSelectVideo={this.onVideoSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Layout;
