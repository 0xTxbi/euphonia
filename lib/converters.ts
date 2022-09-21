import formatDuration from "format-duration";

// convert from unix to timestamp
export const convertTime = (unixTime) => {

    const convDate = new Date(unixTime)
    return convDate.toLocaleDateString('en-us', { month: 'short', day: '2-digit', year: 'numeric' })

};

// convert track duration to readable format
export const convertDuration = (trackDuration = 0) => {

    return formatDuration(trackDuration * 1000)

}
