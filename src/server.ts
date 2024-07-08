/* eslint-disable no-console */
import { connect } from 'mongoose'
import app from './app'
import config from './config'

const main = async () => {
  const { database_url, port } = config
  try {
    await connect(database_url as string)

    app.listen(port, () => {
      console.log(`Example app listening on port ${port} 🚀`)
    })
  } catch (error) {
    app.listen(5002, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }
}

main()
