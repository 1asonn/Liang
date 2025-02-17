import { Component, PropsWithChildren } from 'react'
import './app.less'
import './locales/index'
import 'taro-ui/dist/style/index.scss'

class App extends Component<PropsWithChildren> {

  componentDidMount() {

  }

  componentDidShow() {}
  

  componentDidHide() { }

  // this.props.children 是将要会渲染的页面
  render() {
    console.log("test",this.props.children)
    return this.props.children
  }
}

export default App
