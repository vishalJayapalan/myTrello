import React, { useState, useEffect } from 'react'
import List from './list'
import CardDetails from './cardDetails'

export default function Lists (props) {
  const [lists, setLists] = useState([])
  const [boardName, setBoardName] = useState([])
  const [boardNameUpdate, setBoardNameUpdate] = useState(false)
  const [cardDetailToggle, setCardDetailToggle] = useState(false)

  useEffect(() => {
    fetchList()
    async function fetchList () {
      const data = await window.fetch(
        `http://localhost:8000/board/${props.match.params.boardId}`
      )
      const jsonData = await data.json()
      // console.log(jsonData)
      setBoardName(jsonData.boardName)
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

  async function createCard (event, listId) {
    const boardId = props.match.params.boardId
    const cardName = event.target.value
    event.target.value = ''
    const data = await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}`,
      {
        method: 'POST',
        body: JSON.stringify({ cardName: cardName }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    const jsonData = await data.json()
    const newLists = lists.map(list => {
      if (list._id == listId) {
        list.cards.push({ cardName, _id: jsonData.cardId })
      }
      return list
    })
    setLists(newLists)
  }

  function dragStart (event, cardId, cardName, listId) {
    const target = event.target
    event.dataTransfer.setData('cardId', cardId)
    event.dataTransfer.setData('cardName', cardName)
    event.dataTransfer.setData('prevListId', listId)
    event.target.classList.add('dragging')

    setTimeout(() => {
      target.style.display = 'none'
    }, 0)
  }

  function dragEnd (event) {
    event.target.style.display = 'flex'
  }

  function dragOver (event) {
    event.preventDefault()
    const childs = event.target.parentNode.childNodes
    for (const child of Array.from(childs)) {
      child.style = 'margin-top:10px'
    }
    event.target.style = 'margin-top:20px'
  }

  async function deleteCard (boardId, listId, cardId) {
    await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}/${cardId}`,
      { method: 'DELETE' }
    )
  }

  async function createCardAtIndex (
    boardId,
    listId,
    cardId,
    cardName,
    cardIndex
  ) {
    await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}/${cardIndex}`,
      {
        method: 'POST',
        body: JSON.stringify({ _id: cardId, cardName: cardName }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  function drop (event, listId) {
    const boardId = props.match.params.boardId
    const target = event.target
    target.style = 'margin-top:10px'
    let cardIndex = 0

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
        cardIndex = index
        list.cards.splice(index, 0, {
          _id: cardId,
          cardName: cardName
        })
      }
      return list
    })
    setLists(newLists)
    deleteCard(boardId, prevListId, cardId)

    createCardAtIndex(boardId, listId, cardId, cardName, cardIndex)
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

  async function updateBoard (name, value) {
    setBoardName(value)
    await window.fetch(`http://localhost:8000/${props.match.params.boardId}`, {
      method: 'PUT',
      body: JSON.stringify({ name: name, value: value }),
      headers: { 'Content-Type': 'application/json' }
    })
  }
  function displayCardFunction (e) {
    setCardDetailToggle(true)
    console.log(e)
  }

  function cardEditFunction (e) {
    e.preventDefault()
    console.log(e)
  }

  let pointerEventClass = ''

  function exitCardDetails (event) {
    event.stopPropagation()
    setCardDetailToggle(false)
    pointerEventClass = ''
    // console.log(e.target)
  }

  let boardNameToggle

  if (boardNameUpdate) {
    boardNameToggle = (
      <input
        type='text'
        className='boardNameInput'
        autoFocus
        defaultValue={boardName}
        onKeyUp={e => {
          if (e.keyCode === 13) {
            setBoardNameUpdate(false)
            return updateBoard('boardName', e.target.value)
          }
        }}
        onBlur={e => {
          setBoardNameUpdate(false)
          return updateBoard('boardName', e.target.value)
        }}
      />
    )
  } else {
    boardNameToggle = (
      <h2
        className='boardNameInList'
        onClick={() => {
          setBoardNameUpdate(true)
        }}
      >
        {boardName}
      </h2>
    )
  }
  let cardDetails = ''
  if (cardDetailToggle) {
    cardDetails = <CardDetails exitCardDetails={exitCardDetails} />
    pointerEventClass = 'avoidClicks'
  }
  // let listContainerClass = ['listsContainer', pointerEventClass]/
  let listContainerClass = ['listsWithBoardName', pointerEventClass]
  listContainerClass = listContainerClass.join(' ')
  return (
    <div
      className={listContainerClass}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        if (cardDetailToggle) exitCardDetails(e)
      }}
    >
      {boardNameToggle}
      <div className='listsContainer'>
        {lists.map(list => (
          <List
            displayCardFunction={displayCardFunction}
            cardEditFunction={cardEditFunction}
            exitCardDetails={exitCardDetails}
            cardDetailToggle={cardDetailToggle}
            key={list._id}
            list={list}
            // onClick={exitCardDetails}
            dragOver={dragOver}
            drop={drop}
            dragStart={dragStart}
            dragEnd={dragEnd}
            updateListName={updateListName}
            createCard={createCard}
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
      {cardDetails}
    </div>
  )
}
