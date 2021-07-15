import { Suspense } from 'react'
import Head from 'next/head'

function createFakeServerData(v) {
  let done = false
  let promise = null
  return {
    read() {
      if (done) {
        done = false
        promise = null
        return v
      }
      if (promise) {
        throw promise
      }
      promise = new Promise((resolve) => {
        setTimeout(() => {
          done = true
          promise = null
          resolve()
        }, 1000)
      })
      throw promise
    },
  }
}
const data = createFakeServerData('Looks great!')

function Comments() {
  const content = data.read()

  console.log('render <Comments>')
  return (
    <div>
      <Head id="bar">
        <title>Correct</title>
      </Head>
      <p>{content}</p>
    </div>
  )
}

export default function Index() {
  return (
    <div>
      <Head id="foo">
        <title>Incorrect</title>
      </Head>
      <h1>Hello!</h1>
      <p>Comments:</p>
      <Suspense fallback={'Loading...'}>
        <Comments />
      </Suspense>
    </div>
  )
}
