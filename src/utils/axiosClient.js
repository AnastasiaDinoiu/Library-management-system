import axios from "axios";

export default function axiosClient() {
    return axios.create({
        baseURL: "http://localhost:8082/api",
        timeout: 5000
    })
}