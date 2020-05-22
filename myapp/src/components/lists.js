import React, { useState, useEffect } from 'react'
import List from './list'

export default function Lists (props) {
  const [lists, setLists] = useState([])

  useEffect(() => {
    fetchList()
    async function fetchList () {
      const data = await window.fetch(
        `http://localhost:8000/board/${props.match.params.boardId}`
      )
      const jsonData = await data.json()
      setLists(jsonData.lists)
    }
  }, [])

  function dragStart () {
    console.log('dragStart')
  }

  function dragEnd () {
    console.log('dragEnd')
  }

  async function createList (event) {
    // console.log(event)
    // const boardId = lists.boardId
    const listName = event.target.value
    event.target.value = ''
    const data = await window.fetch(
      `http://localhost:8000/board/${props.match.params.boardId}`,
      {
        method: 'POST',
        body: JSON.stringify({ listName: listName }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    const jsonData = await data.json()
    setLists([...lists, { listName, _id: jsonData.listId, cards: [] }])
  }

  return (
    <div className='listsContainer'>
      {lists.map(list => (
        <List
          key={list._id}
          list={list}
          boardId={props.match.params.boardId}
          dragStart={dragStart}
          dragEnd={dragEnd}
        />
      ))}
      <div className='newList'>
        <input
          className='createNewList'
          placeholder='Add Another List...'
          onKeyUp={event => {
            if (event.target.value && event.keyCode === 13) {
              return createList(event)
            }
          }}
        />
      </div>
    </div>
  )
}
