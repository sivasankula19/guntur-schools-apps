import { combineReducers, configureStore } from '@reduxjs/toolkit';
import schoolReducer from './reducers/schoolSlice';
import darkModeReducer from './reducers/darkModeSlice';
import authReducer from './reducers/authSlice';
import accessReducer from './reducers/accessControlSlice';
import toastReducer from './reducers/toastMessageSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage

const persistConfig = {
  key: 'root', 
  storage,
  whitelist: ['counter', 'darkMode', 'auth', 'school','accessControl'],
  blacklist: ['register'],
};

const rootReducer = combineReducers({
    darkMode:darkModeReducer,
    auth:authReducer,
    school:schoolReducer,
    accessControl:accessReducer,
    toastMessage:toastReducer
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })

});

export const persistor = persistStore(store); // Create persistor

export default store;
