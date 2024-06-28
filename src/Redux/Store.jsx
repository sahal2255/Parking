import {configureStore} from '@reduxjs/toolkit'
import parkReducer from './Parking/ParkSlice'

export const store=configureStore({
    reducer:{
        parks:parkReducer,
    }
})