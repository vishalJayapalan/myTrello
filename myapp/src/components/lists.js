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
    console.log('dragStart:', cardId, cardName)
    event.dataTransfer.setData('cardId', cardId)
    event.dataTransfer.setData('cardName', cardName)
    event.dataTransfer.setData('prevListId', listId)

    //   const target = event.target
    //   setTimeout(() => (target.style.display = 'none'), 0)
  }

  function dragOver (event) {
    event.preventDefault()
  }

  function drop (event, listId) {
    const cardId = event.dataTransfer.getData('cardId')
    const cardName = event.dataTransfer.getData('cardName')
    const prevListId = event.dataTransfer.getData('prevListId')
    const newLists = lists.map(list => {
      if (list._id == prevListId) {
        const newCards = []
        for (const card of list.cards) {
          if (card._id != cardId) {
            newCards.push(card)
          }
        }
        // console.log(newCards)
        list.cards = newCards
        console.log(list.cards)
      }
      if (list._id == listId) {
        list.cards.push({ _id: cardId, cardName: cardName })
      }
      // console.log(list)
      return list
    })
    console.log(newLists)
    setLists(newLists)
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
