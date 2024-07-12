/* eslint-disable no-console */
import { Server } from 'http'
import { connect } from 'mongoose'
import app from './app'
import config from './config'

let server: Server

const main = async () => {
  const { database_url, port } = config
  try {
    await connect(database_url as string)

    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port} 🚀`)
    })
  } catch (error) {
    app.listen(5002, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }
}

main()

process.on('unhandledRejection', () => {
  console.log('unhandled exception detected')

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log('uncaught exception detected')

  process.exit(1)
})
