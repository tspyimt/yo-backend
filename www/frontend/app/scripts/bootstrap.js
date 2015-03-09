window.bootstrap = {

  SET_ENV: "dev",   // Enviroment: "dev" || "product"

  /*
  * Set Router & Config router for App
  * */
  routes: {
    "/": {
      "controller": "HomeCtrl",
      "templateUrl": "/views/welcome.html"
    },
    "/me": {
      "controller": "UserCtrl",
      "templateUrl": "/views/user.html"
    },
    "main": {
      url: "/main",
      templateUrl: "views/layouts/main.html",
      controller: "MainCtrl"
    },
    "about": {
      url: "/about",
      templateUrl: "views/about.html"
    },
    "login": {
      url: '/login',
      templateUrl: "../views/partials/login.html",
      controller: "LoginCtrl"
    },
    "/debug": {
      "controller": "ChangeCtrl",
      "templateUrl": "views/changes.html"
    }
  },
  otherwise: "/main",    // For any unmatched url, redirect to /main
  html5Mode: false,
  stripTrailingSlashes: false,
  setAuthHeader: "X-Access-Token",

  /*
  * Set Dependencies Application
  * */
  dependencies: [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'yoServices',
    'formly',
    'oitozero.ngSweetAlert',
    'satellizer'
  ],

  /*
   * Config Enviroments
   * */
  CONFIG_ENV: {
    "dev": {
      "url": "http://localhost:1234/api",
      "media_url": "http://yo.vsoft.vn/media"
    },
    "product": {
      "url": "http://yo.vsoft.vn/api",
      "media_url": "http://yo.vsoft.vn/media"
    },
    "custom": {
      "url": "http://la.vsoft.vn/api",
      "media_url": "http://la.vsoft.vn/media"
    }
  },
  GET_ENV : function(){
    if(this.SET_ENV == "dev"){
      return this.CONFIG_ENV.dev;
    }
    if(this.SET_ENV == "product"){
      return this.CONFIG_ENV.product;
    }
  },

  /*
   * Authenticate Provider
   * Set ClientId
   * */
   authProvider : {
      facebook : {
        clientId: "790848557619322",     // Client Id Facebook
        url: 'http://yo.vsoft.vn/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
        redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/',
        scope: 'email',
        scopeDelimiter: ',',
        requiredUrlParams: ['display', 'scope'],
        display: 'popup',
        type: '2.0',
        popupOptions: { width: 481, height: 269 }
      },
      
      google   : {
        clientId: "",                     // Client Id Google
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        display: 'popup',
        type: '2.0',
        popupOptions: { width: 580, height: 400 }
      },

      config : {
        loginOnSignup : true,
        loginRedirect : "/",
        logoutRedirect: "/",
        signupRedirect: "/login",
        loginUrl      : "http://192.168.5.100:3000/auth/login",
        signupUrl     : "http://192.168.5.100:3000/auth/signup",
        loginRoute    : 'http://192.168.5.100:3000/login',
        signupRoute   : 'http://192.168.5.100:3000/signup',
        tokenName     : 'token',
        tokenPrefix   : 'satellizer', // Local Storage name prefix
        unlinkUrl     : '/auth/unlink/',
        setAuthHeader : 'Authorization'
      }
   }
};
