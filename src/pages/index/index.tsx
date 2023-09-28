import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import './index.scss'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <AtButton type="primary">taro-ui</AtButton>
    </View>
  )
}
