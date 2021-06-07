import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://belarusbank.by/api/',
});

export const ratesApi = {
    getUSDRates() {
        return instance.get<RatesType[]>('kursExchange?city=Минск')
    }
}


type RatesType = {
    "USD_in": string,
    "USD_out": string,
    "EUR_in": string,
    "EUR_out": string,
    "RUB_in": string,
    "RUB_out": string,
    "GBP_in": string,
    "GBP_out": string,
    "CAD_in": string,
    "CAD_out": string,
    "PLN_in": string,
    "PLN_out": string,
    "UAH_in": string,
    "UAH_out": string,
    "SEK_in": string,
    "SEK_out": string,
    "CHF_in": string,
    "CHF_out": string,
    "USD_EUR_in": string,
    "USD_EUR_out": string,
    "USD_RUB_in": string,
    "USD_RUB_out": string,
    "RUB_EUR_in": string,
    "RUB_EUR_out": string,
    "JPY_in": string,
    "JPY_out": string,
    "CNY_in": string,
    "CNY_out": string,
    "CZK_in": string,
    "CZK_out": string,
    "NOK_in": string,
    "NOK_out": string,
    "filial_id": string,
    "sap_id": string,
    "info_worktime": string,
    "street_type": string,
    "street": string,
    "filials_text": string,
    "home_number": string,
    "name": string,
    "name_type": string
}
