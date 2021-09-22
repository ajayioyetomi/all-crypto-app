import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
//import { buildQueries } from '@testing-library/dom';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'a98a16c9f0msh0428fb47c0b816ep1bfd80jsn550bf3013139',
}
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url,headers:cryptoApiHeaders})
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder) => ({
        getCryptos: builder.query({
            query:()=> createRequest('/coins')
        })
    })

});

export const {
    useGetCryptosQuery,
} = cryptoApi;