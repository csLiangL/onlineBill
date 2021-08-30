import axios from "axios"
import bus from "@/main.js"

export function baseRequest(config) {
    const requestAxios = axios.create({
        baseURL: "https://qcverx.fn.thelarkcloud.com",
        timeout: 5000
    })

    requestAxios.interceptors.response.use(
        res => { 
            bus.$emit("Loading", true)
            return res;
        }
    )


    return requestAxios(config);
}
