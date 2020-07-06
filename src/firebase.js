var firebase = require('firebase/app').default

require('firebase/auth')
require('firebase/database')

var app = null
var provider = null
export function getFirebaseApp ({
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
}) {
  const config = {
    apiKey: FIREBASE_API_KEY.trim(),
    authDomain: FIREBASE_AUTH_DOMAIN.trim(),
    databaseURL: FIREBASE_DATABASE_URL.trim(),
    projectId: FIREBASE_PROJECT_ID.trim(),
    storageBucket: FIREBASE_STORAGE_BUCKET.trim(),
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID.trim(),
    appId: FIREBASE_APP_ID.trim(),
    measurementId: FIREBASE_MEASUREMENT_ID.trim()

  }
  if (!app && firebase.initializeApp) {
    app = firebase.initializeApp(config)
  }
  return app
}

export function observeLoginStatus ({ onSuccess, onFailed }) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      onSuccess({ email: user.email, name: user.displayName, image: user.photoURL })
    } else {
      onFailed()
    }
  })
}

export function doLogin ({ onSuccess, onFailed }) {
  try {
    provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().useDeviceLanguage()

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        return firebase.auth().signInWithPopup(provider).then(function (result) {
          const user = result.user
          onSuccess({ email: user.email, name: user.displayName, image: user.photoURL })
        }).catch(function (error) {
          const errorMessage = error.message
          console.error('> Error when login', errorMessage)
        })
      })
      .catch(function (error) {
        const errorMessage = error.message
        console.error('> Error when set persistence', errorMessage)
        onFailed(errorMessage)
      })
  } catch (error) {
    const errorMessage = error.message
    console.error('> Unexpected error happen', errorMessage)
    onFailed(errorMessage)
  }
}

export function doLogout ({ onLogout, onFailed }) {
  firebase.auth().signOut().then(function () {
    onLogout()
  }).catch(function (error) {
    const errorMessage = error.message
    console.error('> Error when logout', errorMessage)
    onFailed(errorMessage)
  })
}

