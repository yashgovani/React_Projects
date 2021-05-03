import axios from 'axios';

const KEY = //ADD YOUR KEY HERE

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResult: 5,
    key: KEY,
  },
});
