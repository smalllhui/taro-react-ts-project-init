import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { useAppSelector, useAppDispatch } from '@/store'
import { increment, incrementByAmount, getMovieData } from '@/store/reducers/testSlice'
import './index.scss'

export default function Index() {
  const testStore = useAppSelector(store => store.test)
  const dispatch = useAppDispatch()

  // 加  同步测试
  const onIncrementByAmount = (num: number) => {
    dispatch(incrementByAmount({ num }))
  }
  // 加1 同步
  const onIncrement = () => {
    dispatch(increment())
  }

  // 查询电影列表 异步action测试
  const onQueryMovieList = () => {
    dispatch(getMovieData({ pageSize: 9 }))
  }

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className="index">
      <Text>Store测试-----当前count:{testStore.count}</Text>
      <AtButton type="primary" onClick={onIncrement}>
        +1
      </AtButton>
      <AtButton onClick={() => onIncrementByAmount(2)}>count+5</AtButton>
      <AtButton onClick={() => onIncrementByAmount(-1)}>count-1</AtButton>
      <Text>电影列表----共有{testStore.total}个</Text>
      <AtButton onClick={onQueryMovieList}>获取电影列表</AtButton>
      <View>
        {testStore.movieList.map((movie, index) => {
          return <Text key={index}>{movie.title}</Text>
        })}
      </View>
    </View>
  )
}
