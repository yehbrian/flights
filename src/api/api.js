import {API} from '../constants/api_constants';
import axios from 'axios';
export default class api {
    static async getAircrafts(){
        const response = await axios.get(API.AIRCRAFTS);
        return await response.data;
    }

    static async getFlights(offset =0){
        const response = await axios.get(API.FLIGHTS + `?offset=${offset}`);
        return await response.data;
    }
}