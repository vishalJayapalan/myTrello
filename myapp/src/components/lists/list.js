import React from 'react'
import Cards from '../cards/cards'
import {
  dragStartListFunction,
  dragEndListFunction,
  dragListLeaveFunction,
  dragOverListFunction,
  dropListFunction
} from './dragList'
// import { getCookie } from '../util/cookies'
function List (props) {
  // async function handleDropList (event, listId) {
  //   event.persist()
  //   const boardId = props.boardId
  //   const prevListId = event.dataTransfer.getData('prevListId')
  //   const moveCard = JSON.parse(event.dataTransfer.getData('card'))
  //   await deleteCardFunction(
  //     boardId,
  //     props.lists,
  //     prevListId,
  //     moveCard._id,
  //     getCookie,
  //     props.updateListState
  //   )
  //   const { newLists, cardIndex } = dropCardFunction(
  //     event,
  //     listId,
  //     props.lists,
  //     moveCard
  //   )
  //   // setLists(newLists)
  //   props.updateListState(newLists)
  //   await createCardAtIndexFunction(
  //     boardId,
  //     listId,
  //     cardIndex,
  //     moveCard,
  //     getCookie
  //   )
  // }
  return (
    <div
      className='listContainer'
      onDragStart={e => dragStartListFunction(e, props.list)}
      onDragEnd={e => dragEndListFunction(e)}
      onDragOver={e => dragOverListFunction(e)}
      onDrop={e => {
        dropListFunction(e, props.list._id)
      }}
      onDragLeave={e => dragListLeaveFunction(e)}
      draggable='true'
    >
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

      <Cards
        displayCardFunction={props.displayCardFunction}
        cardEditFunction={props.cardEditFunction}
        // key={card._id}
        // listId={props.list._id}
        // dragStartCard={props.dragStartCard}
        // dragEndCard={props.dragEndCard}
        // card={card}
        lists={props.lists}
        updateListsState={props.updateListsState}
        dropCard={props.dropCard}
        boardId={props.boardId}
        list={props.list}
      />
    </div>
    // </div>
  )
}

export default List
