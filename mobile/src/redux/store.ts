import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import schoolReducer from './reducers/schoolSlice';
import darkModeReducer from './reducers/darkModeSlice';
import authReducer from './reducers/authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import routesSlice from './reducers/routesSlice';

const persistConfig = {
  key: 'root', 
  storage,
  whitelist: ['counter', 'darkMode', 'auth', 'school'],
  blacklist: ['register'],
};

const rootReducer = combineReducers({
    counter: counterReducer,
    darkMode:darkModeReducer,
    auth:authReducer,
    school:schoolReducer,
    routes:routesSlice
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
