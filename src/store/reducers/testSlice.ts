// /store/reducers/testSlice.ts
import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { getMovieList } from '@/api/movieApi'
// 数据接口列席
interface ICountState {
  count: number
  movieList: any[]
  total: number
}

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：pending（进行中）、fulfilled（成功）、rejected（失败）
// 导出异步action方法
export const getMovieData = createAsyncThunk('movie/getMovie', async (params: { pageSize: number }) => {
  console.log('传递参数')
  console.log(params)
  const res = await getMovieList(params.pageSize)
  return res
})

// 初始值
const initialState: ICountState = {
  count: 0,
  movieList: [],
  total: 0,
}

/**
 * 1.创建一个slice reducer
 */
const CountSlice = createSlice({
  name: 'count-slice',
  initialState,
  reducers: {
    /**
     *加1操作
     */
    increment: (state: Draft<ICountState>) => {
      state.count = state.count + 1
    },
    /**
     *数字加 根据参数
     */
    incrementByAmount: (
      state: Draft<ICountState>,
      action: PayloadAction<{
        num: number
      }>,
    ) => {
      state.count = state.count + action.payload.num
    },
  },

  // extraReducers 字段让 slice 处理在别处定义的 actions,包括由 createAsyncThunk或其它slice生成的action。
  extraReducers(builder) {
    // 处理createAsyncThunk 生成的 actions
    builder
      .addCase(getMovieData.pending, (state, action) => {
        console.log('🚀 ~ 进行中！')
        console.log(state, action)
      })
      .addCase(getMovieData.fulfilled, (state, { payload }: any) => {
        console.log('🚀 ~ fulfilled', payload)
        state.movieList = payload.data.list
        state.total = payload.data.list.length
      })
      .addCase(getMovieData.rejected, (state, action) => {
        console.log('🚀 ~ rejected')
        console.log(state, action)
      })
  },
})

// 导出同步action方法
export const { incrementByAmount, increment } = CountSlice.actions
// 默认导出
export default CountSlice.reducer
