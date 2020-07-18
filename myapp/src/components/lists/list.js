import React from 'react'
import Cards from '../cards/cards'

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

      {/* {props.list.cards.map(card => (
          <Card
            displayCardFunction={props.displayCardFunction}
            cardEditFunction={props.cardEditFunction}
            key={card._id}
            listId={props.list._id}
            // dragStartCard={props.dragStartCard}
            // dragEndCard={props.dragEndCard}
            card={card}
            list={props.list}
          />
        ))} */}
      <Cards
        displayCardFunction={props.displayCardFunction}
        cardEditFunction={props.cardEditFunction}
        // key={card._id}
        // listId={props.list._id}
        // dragStartCard={props.dragStartCard}
        // dragEndCard={props.dragEndCard}
        // card={card}
        lists={props.lists}
        updateListState={props.updateListState}
        dropCard={props.dropCard}
        boardId={props.boardId}
        list={props.list}
      />
    </div>
    // </div>
  )
}

export default List
