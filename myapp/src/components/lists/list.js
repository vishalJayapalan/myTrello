import React from 'react'
import Card from '../cards/card'

function List (props) {
  return (
    <div className='listContainer'>
      <div className='listNameContainer'>
        <textarea
          className='listName'
          spellCheck='false'
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
        />
      </div>
      <div
        className='cardsContainer'
        onDragOver={e => props.dragOverCard(e)}
        onDrop={e => {
          props.dropCard(e, props.list._id)
        }}
      >
        {props.list.cards.map(card => (
          <Card
            displayCardFunction={props.displayCardFunction}
            updateCardName={props.updateCardName}
            cardEditFunction={props.cardEditFunction}
            key={card._id}
            listId={props.list._id}
            dragStartCard={props.dragStartCard}
            dragEndCard={props.dragEndCard}
            card={card}
            list={props.list}
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
