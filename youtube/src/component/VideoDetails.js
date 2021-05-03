import React from 'react';
import { CircularProgress } from '@material-ui/core';

const VideoDetails = ({ video, onAddWatchLater }) => {
  if (!video) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} title="video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
      <button
        className="ui primary button"
        onClick={() => onAddWatchLater(video)}
      >
        Add to watch later
      </button>
    </div>
  );
};

export default VideoDetails;
