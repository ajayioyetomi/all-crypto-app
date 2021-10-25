import {configureStore} from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewApi';

export default configureStore({
   reducer:{
       [cryptoApi.reducerPath]:cryptoApi.reducer,
       [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer,
   }, 
});