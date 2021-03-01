import './App.css';
// import CommetList from './CommetList';
// import Button from 'antd/lib/button'
// import 'antd/dist/antd.css'
// import { Button } from 'antd'
// import Hoc from './Hoc'
// import Composition from './Composition'
// import ContextTest from './ContextTest';
// import HookTest from './HookTest';
// import HookTestAsyncAction from './HookTestAsyncAction'
// import AntdForm from './AntdFrom'
// import KForm from './KFrom';
import HookTestReduxRouter from './HookTestReduxRouter'
import store from './store'
import {Provider} from 'react-redux'

function App() {
  return (
    <div className="App">
      {/* <Button type="primary">Button</Button> */}
      {/* <CommetList /> */}
      {/* 高阶组件 */}
      {/* <Hoc name="hoc" /> */}
      {/* 组件复合 */}
      {/* <Composition /> */}
      {/* 上下文 */}
      {/* <ContextTest /> */}
      {/* <HookTest /> */}
      {/* <HookTestAsyncAction /> */}
      {/* <AntdForm /> */}
      {/* <KForm /> */}
      <Provider store={store}>
        <HookTestReduxRouter />
      </Provider>
    </div>
  );
}

export default App;
