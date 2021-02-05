import axios from 'axios';
let API_URL="https://localhost:44323/api";
export async function callApi(endpoint, method='GET',body){
        return await axios({
            method,
            url:`${API_URL}/${endpoint}`,
            data:body,
        }).catch(e=>{
            console.log(e)
        })
}

export function GET_ALL_IMAGES(endpoint){
    return callApi(endpoint,"GET");
}

