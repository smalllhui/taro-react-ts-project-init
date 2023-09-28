import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// 多个Slice的引入；
import modules from './reducers'

// 合并多个Slice
const reducer = combineReducers(modules)
// configureStore创建一个redux数据
const store = configureStore({
  reducer: reducer,
  // 配置中间键
  middleware: getDefaultMiddleware => {
    if (process.env.NODE_ENV === 'production') {
      //不打印logger
      return getDefaultMiddleware({ serializableCheck: false }).concat()
    }
    return getDefaultMiddleware({ serializableCheck: false }).concat(logger)
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 二次封装：对useDispatch，useSelector进行封装，解决每次使用都要导入RootState,AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
