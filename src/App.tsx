import { useState } from 'react'
import './App.css'
import actions1 from '../terms/actions_1.json'
import actions2 from '../terms/actions_2.json'
import descriptor1 from '../terms/descriptor_1.json'
import descriptor2 from '../terms/descriptor_2.json'

const lists = {
  'Actions 1': actions1.terms,
  'Actions 2': actions2.terms,
  'Descriptor 1': descriptor1.terms,
  'Descriptor 2': descriptor2.terms,
}

type ListName = keyof typeof lists

function App() {
  const [leftList, setLeftList] = useState<ListName>('Actions 1')
  const [rightList, setRightList] = useState<ListName>('Actions 2')
  const [results, setResults] = useState<{ left: string; right: string }[]>([])

  const generatePairs = (count: number) => {
    const leftTerms = lists[leftList]
    const rightTerms = lists[rightList]
    const pairs = []
    for (let i = 0; i < count; i++) {
      const randomLeft = leftTerms[Math.floor(Math.random() * leftTerms.length)]
      const randomRight = rightTerms[Math.floor(Math.random() * rightTerms.length)]
      pairs.push({ left: randomLeft, right: randomRight })
    }
    setResults(pairs)
  }

  return (
    <div className="app">
      <h1>Oracles</h1>
      <div className="controls">
        <select
          value={leftList}
          onChange={(e) => setLeftList(e.target.value as ListName)}
        >
          {Object.keys(lists).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select
          value={rightList}
          onChange={(e) => setRightList(e.target.value as ListName)}
        >
          {Object.keys(lists).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="buttons">
        <button onClick={() => generatePairs(1)}>Generate 1</button>
        <button onClick={() => generatePairs(10)}>Generate 10</button>
      </div>
      {results.length > 0 && (
        <div className="results">
          {results.map((result, index) => (
            <div key={index} className="result">
              {result.left} {result.right}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App