import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://developerhub.alfabank.by:8273/partner/1.0.0/public/',
});

export const ratesApi = {
    getUSDRates() {
        return instance.get<ResponseType>('rates')
    }
}

type ResponseType = {
    rates: RatesType[]
}

type RatesType = {
    "sellRate": number,
    "sellIso": string,
    "sellCode": number,
    "buyRate": number,
    "buyIso": string,
    "buyCode": number,
    "quantity": number,
    "name": string,
    "date": Date
}
