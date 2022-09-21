// convert from unix to timestamp
export const convertTime = (unixTime) => {

    const convDate = new Date(unixTime)
    return convDate.toLocaleDateString('en-us', { month: 'short', day: '2-digit', year: 'numeric' })

};

// convert track duration to readable format
export const convertDuration = (trackDuration) => {
    let minutes = Math.floor(trackDuration / 60);
    let seconds = ((trackDuration % 60) / 100).toFixed(0);

    return (
        parseInt(seconds) == 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds
    );

}
