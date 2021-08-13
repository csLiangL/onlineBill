// return 2021年8月13日 18:57
export const dateProcess = {
    dt(date) {
        return date.split(" ")[0];
    },

    hm(date) {
        return date.split(" ")[1]
    },

    // return 13
    getDate(date) {
        return this.dt(date).split("月")[1].split("日")[0];
    },

    // return 8
    getMonth(date) {
        return this.dt(date).split("年")[1].split("月")[0];
    },

    // return 2021
    getYear(date) {
        return this.dt(date).split("年")[0];
    },

    // return 18
    getHour(date) {
        return this.hm(date).split(":")[0]
    },

    // return 57
    getMinute(date) {
        return this.hm(date).split(":")[1]
    },

    // return 周几
    getDay(date) {

        // let day = new Date(date.split(" ")[0].split("年")[0],
        //     parseInt(date.split(" ")[1].split(":")[0]) - 1,
        //     date.split(" ")[0].split("月")[1].split("日")[0]).getDay();
        let day = new Date(this.getYear(date),
            parseInt(this.getMonth(date)) - 1,
            this.getDate(date)).getDay();
        switch (day) {
            case 1:
                day = "一";
                break;
            case 2:
                day = "二";
                break;
            case 3:
                day = "三";
                break;
            case 4:
                day = "四";
                break;
            case 5:
                day = "五";
                break;
            case 6:
                day = "六";
                break;
            case 7:
                day = "日";
                break;
        }

        return "周" + day;

    },

    toDate(date) {
        let year = this.getYear(date);
        let month = parseInt(this.getMonth(date));
        let dt = this.getDate(date);
        let hour = this.getHour(date);
        let minute = this.getMinute(date)
        return new Date(year, month - 1, dt, hour, minute)
    }
}






