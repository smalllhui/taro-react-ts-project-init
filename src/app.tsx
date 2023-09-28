import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
//1、引入store
import store from '@/store'
//2、引入注入者
import { Provider } from 'react-redux'
// 引入taro-ui样式
import 'taro-ui/dist/style/index.scss'
// 全局less
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
    console.log(process.env.TARO_APP_API)
    console.log(process.env.NODE_ENV)
  })

  //3、拿到提供者(Provider) 让他来把所有的数据注入到每个组件中,children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>
}

export default App
