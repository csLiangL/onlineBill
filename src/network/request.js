import axios from "axios"

export function saveBill(config) {
    const requestAxios = axios.create({
        baseURL: "https://qcverx.fn.thelarkcloud.com",
        timeout: 5000
    })
    return requestAxios(config)
}

export function getBills(config) {
    const requestAxios = axios.create({
        baseURL: "https://qcverx.fn.thelarkcloud.com",
        timeout: 5000
    })

    requestAxios.interceptors.response.use(res => {

        // res: 按时间排序的账单
        // newdata: 按时间分类，并排序的账单
        let rawdata = res.data;
        // console.log(rawdata)
        let newdata = []
        if (rawdata.length > 0) {

            let tempdate = rawdata[0].time.split(" ")[0];
            let tempbills = { "date": tempdate, "lists": [rawdata[0]] };
            if (rawdata.length == 1) newdata.push(tempbills)

            for (let i = 1; i < rawdata.length; i++) {

                let date = rawdata[i].time.split(" ")[0];

                if (date == tempdate) {
                    tempbills['lists'].push(rawdata[i])
                } else {
                    newdata.push(tempbills)
                    tempdate = date;
                    tempbills = { "date": tempdate, "lists": [rawdata[i]] }
                }

                if (i == rawdata.length - 1) newdata.push(tempbills)
            }
        }
        // console.log("拦截后:", newdata)
        return newdata;
    })
    return requestAxios(config)
}