// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskReducer from './Parking/ParkSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['parks']
};

const rootReducer=combineReducers({
    parks:taskReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, 
  middleware:(getDefaultMiddleWare)=>(
    getDefaultMiddleWare({
        serializableCheck:false,
    })
  )
  
});

export const persistor = persistStore(store);
