import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

require('dotenv').config()

const { PORT, NODE_ENV, FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } = process.env
const dev = NODE_ENV === 'development'

polka() // You can also use Express
  .use(
    '/ajari-koding',
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: () => ({
        FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN,
        FIREBASE_DATABASE_URL,
        FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
