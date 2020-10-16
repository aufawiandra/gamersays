import axios from "axios";
import url from "./url";

let instance = axios.create({
    baseURL: url.API_BASE_URL
});