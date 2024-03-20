const BASE_URL = "http://52.172.149.201:4000/api/";

function convertSeconds(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    var str = remainingSeconds + " seconds";
    str = minutes> 0 ? minutes + " mins : " +str : str;
    str = hours>0 ? hours + " hours : " + str : str;
    return str;
}

export { BASE_URL, convertSeconds };
