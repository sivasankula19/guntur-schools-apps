import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice'; // Import your reducer
import darkModeReducer from './reducers/darkModeSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage

const persistConfig = {
  key: 'root', 
  storage,
  whitelist: ['counter', 'darkMode'],
  blacklist: ['register'],
};

const rootReducer = combineReducers({
    counter: counterReducer,
    darkMode:darkModeReducer,
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
