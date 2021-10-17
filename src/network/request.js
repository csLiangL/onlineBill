import axios from "axios"
import $bus from "@/main.js"

export function baseRequest(config) {
    const requestAxios = axios.create({
        baseURL: "https://qcverx.fn.thelarkcloud.com",
        timeout: 5000
    })

    requestAxios.interceptors.request.use(
        config => { 
            $bus.$emit("Loading", true)
            return config;
        }
    )
    requestAxios.interceptors.response.use(
        res => { 
            $bus.$emit("Loading", false)
            return res;
        }
    )
    return requestAxios(config);
}
