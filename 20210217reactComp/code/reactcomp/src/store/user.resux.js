const initialState = { isLogin: false, loading: false };
// export function login(user) {
//   return (dispatch, getState) => {
//     dispatch({ type: "requestLogin" });
//     setTimeout(() => {
//       if (Date.now() % 2 === 0) {
//         dispatch({ type: "loginSuccess" });
//       } else {
//         dispatch({ type: "loginFailure" });
//       }
//     }, 1000);
//   };
// }

// 派发的是对象而非函数
export function login(uname) {
  return {
    type: 'login',
    uname
  }
}

export default function user(state = initialState, action) {
    switch (action.type) {
      case "requestLogin":
        return { isLogin: false, loading: true };
      case "loginSuccess":
        return { isLogin: true, loading: false };
      case "loginFailure":
        return { isLogin: false, loading: false };
      default:
        return state;
    }
  };