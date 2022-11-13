import axios from 'axios'
import React, { useState } from 'react'

const App = () => {
  const url = 'https://jsonplaceholder.typicode.com/users'

  const [fetchController, setFetchController] =
    useState<AbortController | null>(null)

  const withAborting = async () => {
    if (fetchController) {
      fetchController.abort()
    }

    try {
      const abortController = new AbortController()

      setFetchController(abortController)

      const { data } = await axios.get(url, {
        signal: abortController.signal,
      })

      console.log(data)
      setFetchController(null)
    } catch (error) {
      //
    }
  }

  const withoutAborting = async () => {
    try {
      const { data } = await axios.get(url)

      console.log(data)
    } catch (error) {
      //
    }
  }

  return (
    <div>
      <h1>Proper Data Fetch</h1>
      <p>Open your network section in devtools and see the difference</p>
      <button onClick={withAborting}>fetch data with aborting</button>
      <button onClick={withoutAborting}>fetch data without aborting</button>
    </div>
  )
}

export default App
