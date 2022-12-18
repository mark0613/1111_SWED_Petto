import Moment from 'moment';

class DateFormatter {
    static datetime(datetimeString, formt="YYYY-MM-DD HH:mm:ss") {
        return Moment(datetimeString).format('YYYY-MM-DD HH:mm:ss')
    };
}

export { DateFormatter };
