'use strict'

const loginForm = new UserForm();

loginForm.callbackResonse = (response) => {
  console.log(response);
  if (response.success === true) {
    location.reload()
  }
  if (response.success === false && loginForm.callbackResonse.fnType === 'login') {
    loginForm.setLoginErrorMessage(response.error)
  } else {
    loginForm.setRegisterErrorMessage(response.error)
  }
}

loginForm.loginFormCallback = (data) => {
  loginForm.callbackResonse.fnType = 'login';
  ApiConnector.login(data, loginForm.callbackResonse);
}

loginForm.registerFormCallback = (data) => {
  loginForm.callbackResonse.fnType = 'reg';
  ApiConnector.register(data, loginForm.callbackResonse)
}

