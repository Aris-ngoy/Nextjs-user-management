import moment from "moment"

export const formatDateTime = (date: Date, format : string  = "DD/MM/YYYY : HH:mm:ss") => {
    const dateTime = new Date(date)
    //format with momnentjs DD/MM/YYYY : HH:mm:ss
    return moment(dateTime).format(format)
}
