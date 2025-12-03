import { useEffect, useState } from 'react'
import { client } from './sanityClient'

interface TestDoc {
  _id: string
  title: string
}

function App() {
  const [data, setData] = useState<TestDoc[]>([])

  useEffect(() => {
    client.fetch('*[_type == "test"]').then((res) => {
      console.log('Sanity data:', res)
      setData(res)
    })
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Sanity Fetch Test</h1>
      {data.length > 0 ? (
        <p>Received: {data[0].title}</p>
      ) : (
        <p>No data yet...</p>
      )}
    </div>
  )
}

export default App
