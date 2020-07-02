import axios from 'axios'

import {getToken} from "./auth";

// create an axios instance
const service = axios.create({

    //baseURL for local server
    baseURL :'http://localhost:8082',

    // timeout : 1000,  // request timeout
    headers:{
        authorization:'bearer'+ getToken()
    }
})

export default service
