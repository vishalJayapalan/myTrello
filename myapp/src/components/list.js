import React, { useState } from 'react'
import Card from './card'
// import Cards from './cards'

function List (props) {
  const [cards, setCards] = useState(props.list.cards)
  const [listNameUpdate, setListNameUpdate] = useState(false)
  // console.log('props', props.list.cards)
  // console.log('state', cards)
  let listNameToggle
  if (listNameUpdate) {
    listNameToggle = (
      <input
        type='text'
        className='listNameInput'
        autoFocus
        defaultValue={props.list.listName}
        onKeyUp={e => {
          if (e.keyCode === 13) {
            setListNameUpdate(false)
            return props.updateListName(e, props.list._id)
          }
        }}
        onBlur={e => {
          setListNameUpdate(false)
          return props.updateListName(e, props.list._id)
        }}
      />
    )
  } else {
    listNameToggle = (
      <h4
        className='listName'
        onClick={() => {
          setListNameUpdate(true)
        }}
      >
        {props.list.listName}
      </h4>
    )
  }

  async function createCard (event) {
    const boardId = props.boardId
    const listId = props.list._id
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
    setCards([...cards, { cardName, _id: jsonData.cardId }])
  }

  return (
    <div className='listContainer'>
      {listNameToggle}

      <div
        className='cardContainer'
        onDragOver={e => props.dragOver(e)}
        onDrop={e => {
          props.drop(e, props.list._id)
        }}
      >
        {props.list.cards.map(card => (
          <Card
            key={card._id}
            listId={props.list._id}
            dragStart={props.dragStart}
            dragEnd={props.dragEnd}
            card={card}
            list={props.list}
          />
        ))}
        <input
          className='newCardInput'
          onKeyUp={e => {
            if (e.target.value && e.keyCode === 13) {
              return createCard(e)
            }
          }}
          placeholder='Add New Card....'
        />
      </div>
    </div>
  )
}

export default List
