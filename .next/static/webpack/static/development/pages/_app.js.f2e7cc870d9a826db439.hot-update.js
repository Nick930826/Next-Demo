webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./store.js":
/*!******************!*\
  !*** ./store.js ***!
  \******************/
/*! exports provided: add, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initializeStore; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-devtools-extension */ "./node_modules/redux-devtools-extension/index.js");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_4__);





var initailState = {
  count: 0
};
var userInitailState = {
  username: 'Nick'
};

function countReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initailState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD':
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
        count: state.count + action.num
      });

    default:
      return state;
  }
}

function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : userInitailState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_USERNAME':
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
        username: action.name
      });

    default:
      return state;
  }
}

var allReducer = Object(redux__WEBPACK_IMPORTED_MODULE_2__["combineReducers"])({
  counter: countReducer,
  user: userReducer
}); // 监听store状态变化的方法
// store.subscribe(() => {
//   console.log('changed', store.getState())
// })

function add(num) {
  return {
    type: 'ADD',
    num: num
  };
}

function asyncAdd(num) {
  return function (dispatch) {
    setTimeout(function () {
      dispatch(add(num));
    }, 2000);
  };
}

function initializeStore(state) {
  var store = Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])(allReducer, _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, {
    counter: initailState,
    user: userInitailState
  }, state), Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_4__["composeWithDevTools"])(Object(redux__WEBPACK_IMPORTED_MODULE_2__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_3__["default"])));
  return store;
}

/***/ })

})
//# sourceMappingURL=_app.js.f2e7cc870d9a826db439.hot-update.js.map