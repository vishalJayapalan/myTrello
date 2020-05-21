import React, { useState, useEffect } from 'react'
import List from './list'

export default function Lists (props) {
  useEffect(() => {
    fetchList()
  }, [])

  const [lists, setLists] = useState([{ listName: 'vishal', cards: [] }])

  async function fetchList () {
    const data = await window.fetch(
      `http://localhost:8000/board/${props.match.params.boardId}`
    )
    const jsonData = await data.json()
    setLists(jsonData.lists)
    console.log(jsonData.lists)
  }
  console.log(lists)
  return (
    <div className='listContainer'>
      {lists.map(list => (
        <List key={list._id} list={list} />
      ))}
    </div>
  )
}
