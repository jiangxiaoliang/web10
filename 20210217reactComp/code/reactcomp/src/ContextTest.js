import React, { Component } from 'react';

// 创建上下文
const Context = React.createContext()
const store = {
    token: 'jilei'
}

export default class ContextTest extends Component {
  render() {
    return (
      <Context.Provider value={store}>
          <div>
              <Context.Consumer>
                  {store1 => <p>{store1.token}</p>}
              </Context.Consumer>
          </div>
      </Context.Provider>
    );
  }
}
