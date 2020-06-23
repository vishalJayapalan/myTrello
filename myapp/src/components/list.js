import React, { useState } from 'react'
import Card from './card'

function List (props) {
  return (
    <div className='listContainer'>
      <div className='listNameContainer'>
        <textarea
          className='listName'
          defaultValue={props.list.listName}
          onBlur={e => {
            return props.updateListName(e, props.list._id)
          }}
        />
        <i
          className='fas fa-ellipsis-h dots'
          onClick={e => {
            props.openListActions(e, props.list)
          }}
          // onClick={() => props.deleteList(props.list)}
        />
      </div>
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
            // openListActions={props.openListActions}
          />
        ))}
        <input
          className='newCardInput'
          onKeyUp={e => {
            if (e.target.value && e.keyCode === 13) {
              return props.createCard(e, props.list._id)
            }
          }}
          placeholder='+ Add New Card....'
        />
      </div>
    </div>
  )
}

export default List
