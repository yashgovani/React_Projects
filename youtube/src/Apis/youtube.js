import axios from 'axios';

const KEY = 'AIzaSyCq3PiLEp7YOzlu-Yr3oBb0TilXNuaQGjI';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResult: 5,
    key: KEY,
  },
});
