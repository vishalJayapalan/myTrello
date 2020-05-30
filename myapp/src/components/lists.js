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

  async function createList (event) {
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

  function dragStart (event, cardId, cardName, listId) {
    const target = event.target
    event.dataTransfer.setData('cardId', cardId)
    event.dataTransfer.setData('cardName', cardName)
    event.dataTransfer.setData('prevListId', listId)
    setTimeout(() => {
      target.style.display = 'none'
    }, 0)
    // event.target.style.display = 'none'
  }

  function dragEnd (event) {
    event.target.style.display = 'block'
  }

  function dragOver (event) {
    event.preventDefault()
  }

  function drop (event, listId) {
    const target = event.target
    const box = target.getBoundingClientRect()
    const offset = event.clientY - box.top - box.height / 2
    const cardId = event.dataTransfer.getData('cardId')
    const cardName = event.dataTransfer.getData('cardName')
    const prevListId = event.dataTransfer.getData('prevListId')
    const newLists = lists.map(list => {
      if (list._id == prevListId) {
        const newCards = list.cards.filter(card => card._id != cardId)
        list.cards = newCards
      }
      if (list._id == listId) {
        let index = list.cards.length
        for (let i = 0; i < list.cards.length; i++) {
          if (list.cards[i]._id == event.target.id) {
            if (offset > 0) {
              index = i + 1
            } else {
              index = i
            }
          }
        }
        list.cards.splice(index, 0, { _id: cardId, cardName: cardName })
      }
      return list
    })
    setLists(newLists)
  }

  async function updateListName (event, listId) {
    const value = event.target.value
    const newLists = lists.map(list => {
      if (list._id == listId) {
        list.listName = value
      }
      return list
    })
    setLists(newLists)
    await window.fetch(
      `http://localhost:8000/board/${props.match.params.boardId}/${listId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ listName: value }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return (
    <div className='listsContainer'>
      {lists.map(list => (
        <List
          key={list._id}
          list={list}
          boardId={props.match.params.boardId}
          dragOver={dragOver}
          drop={drop}
          dragStart={dragStart}
          dragEnd={dragEnd}
          updateListName={updateListName}
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
