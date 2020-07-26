import React from 'react'
import Cards from '../cards/cards'
import {
  dragStartListFunction,
  dragEndListFunction,
  dragListLeaveFunction,
  dragOverListFunction,
  dropListFunction
} from './dragList'
import { updateListName } from './listFunctions'
// import { getCookie } from '../util/cookies'
function List (props) {
  return (
    <div
      className='listContainer'
      id={props.list._id}
      onDragStart={e =>
        dragStartListFunction(e, props.list, props.dragListToggler)
      }
      onDragEnd={e =>
        props.dragList && dragEndListFunction(e, props.dragListToggler)
      }
      onDragOver={e => props.dragList && dragOverListFunction(e)}
      onDrop={e => {
        props.dragList &&
          dropListFunction(
            e,
            props.boardId,
            props.lists,
            props.boards,
            props.updateListsState,
            props.updateListActionToggle,
            props.updateListMoveToggle,
            props.updateBoardsState,
            props.dragListToggler
          )
      }}
      onDragLeave={e => props.dragList && dragListLeaveFunction(e)}
      draggable='true'
    >
      <div className='listNameContainer'>
        <textarea
          className='listName'
          spellCheck='false'
          defaultValue={props.list.listName}
          onBlur={e => {
            return updateListName(
              e.target.value,
              props.boardId,
              props.lists,
              props.list._id,
              props.updateListsState
            )
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
        dragCard={props.dragCard}
        dragCardToggler={props.dragCardToggler}
      />
    </div>
    // </div>
  )
}

export default List
