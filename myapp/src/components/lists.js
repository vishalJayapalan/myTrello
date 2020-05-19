import React, { useState, useEffect } from 'react'
import List from './list'

export default function Lists (props) {
  // console.log(props.match.params.boardId)
  const [lists, setLists] = useState([])

  useEffect(() => {
    fetchLists()
  }, [])

  async function fetchLists () {
    const data = await window.fetch(
      `http://localhost:8000/board/${props.match.params.boardId}`
    )
    const jsonData = await data.json()
    await setLists(jsonData.lists)
    console.log(jsonData)
    console.log(lists)
  }
  console.log(lists)
  return (
    // console.log(lists)
    <div className='listContainer'>
      {/* <p>{lists[0].listName}</p> */}
      {/* {lists.map(list => (
        <List key={list._id} list={list} />
      ))} */}
    </div>
  )
}
