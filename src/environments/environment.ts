// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDgEuRFlZRxRl3dwkC2KaPmhsrI7CGeTHk",
    authDomain: "fitv2-dev.firebaseapp.com",
    databaseURL: "https://fitv2-dev.firebaseio.com",
    projectId: "fitv2-dev",
    storageBucket: "fitv2-dev.appspot.com",
    messagingSenderId: "727053755979"
  }
};
