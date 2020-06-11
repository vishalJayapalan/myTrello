import React, { useState } from 'react'
import Card from './card'
// import Cards from './cards'

function List (props) {
  // const [cards, setCards] = useState(props.list.cards)
  const [listNameUpdate, setListNameUpdate] = useState(false)
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

  return (
    <div
      className='listContainer'
      // onClick={e => {
      //   if (props.cardDetailToggle) props.exitCardDetails(e)
      // }}
    >
      {listNameToggle}

      <div
        className='cardsContainer'
        onDragOver={e => props.dragOver(e)}
        onDrop={e => {
          props.drop(e, props.list._id)
        }}
      >
        {props.list.cards.map(card => (
          <Card
            displayCardFunction={props.displayCardFunction}
            updateCardName={props.updateCardName}
            cardEditFunction={props.cardEditFunction}
            key={card._id}
            listId={props.list._id}
            dragStart={props.dragStart}
            dragEnd={props.dragEnd}
            card={card}
            list={props.list}
            // deleteCard={props.deleteCard}
          />
        ))}
        <input
          className='newCardInput'
          onKeyUp={e => {
            if (e.target.value && e.keyCode === 13) {
              return props.createCard(e, props.list._id)
            }
          }}
          placeholder='Add New Card....'
        />
      </div>
    </div>
  )
}

export default List
