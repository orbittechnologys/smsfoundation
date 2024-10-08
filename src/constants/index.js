// const BASE_URL = "http://52.172.149.201:4000/api/";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
// const BASE_URL = "http://20.192.28.44:4000/api/";
const SYNC_URL = import.meta.env.VITE_APP_SYNC_URL;
const csvUrl = import.meta.env.VITE_APP_CSV_LINK;

function convertSeconds(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;
  var str = remainingSeconds + " seconds";
  str = minutes > 0 ? minutes + " mins : " + str : str;
  str = hours > 0 ? hours + " hours : " + str : str;
  return str;
}

function getPercentage(num, denom) {
  if (denom === 0) {
    return 0; // Avoid division by zero
  }
  const percentage = (num / denom) * 100;
  return Math.round(percentage * 100) / 100; // Round to two decimal points
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}

export { BASE_URL, convertSeconds, getPercentage , formatDate, csvUrl, SYNC_URL};
