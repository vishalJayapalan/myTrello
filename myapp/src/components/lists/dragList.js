import { moveListFunction, deleteList } from './listFunctions'

function dragStartListFunction (event, list, dragListToggler) {
  const target = event.target
  event.stopPropagation()
  event.dataTransfer.setData('list', JSON.stringify(list))
  dragListToggler(true)
  setTimeout(() => {
    target.style.display = 'none'
  }, 0)
}

function dragEndListFunction (event, dragListToggler) {
  event.preventDefault()
  event.stopPropagation()
  const target = event.target
  target.style.display = 'block'
  // dragListToggler(false)
}

function dragOverListFunction (event) {
  event.preventDefault()
  event.stopPropagation()
  let target
  if (
    event.target.className === 'listNameContainer' ||
    event.target.className === 'cardsContainer' ||
    event.target.className === 'listName'
  ) {
    if (event.target.className === 'listNameContainer') {
      target = event.target.parentNode
      const childs = event.target.parentNode.parentNode.childNodes
      for (const child of Array.from(childs)) {
        if (child.style.display !== 'none') child.style = 'margin-left:10px'
      }
      target.style = 'margin-left:40px'
    }
    if (
      event.target.className === 'cardsContainer' ||
      event.target.className === 'listName'
    ) {
      target = event.target.parentNode.parentNode

      const childs = event.target.parentNode.parentNode.parentNode.childNodes
      for (const child of Array.from(childs)) {
        if (child.style.display !== 'none') child.style = 'margin-left:10px'
      }
      target.style = 'margin-left:40px'
    }
  } else if (event.target.className === 'createNewList') {
    event.target.parentNode.style = 'margin-left:40px'
  }
}

const dragListLeaveFunction = event => {
  event.preventDefault()
  event.stopPropagation()
  event.currentTarget.style = 'margin-left:10px'
}

async function dropListFunction (
  event,
  boardId,
  lists,
  boards,
  updateListsState,
  updateListActionToggle,
  updateListMoveToggle,
  updateBoardsState,
  dragListToggler
) {
  event.stopPropagation()
  event.persist()
  const moveList = JSON.parse(event.dataTransfer.getData('list'))
  let target
  if (
    event.target.className === 'cardsContainer' ||
    event.target.className === 'listName'
  ) {
    target = event.target.parentNode.parentNode
  } else if (event.target.className === 'listNameContainer') {
    target = event.target.parentNode
  } else if (event.target.className === 'createNewList') {
    console.log('inputParent', event.target.parentNode)
    target = event.target.parentNode
  } else {
    return
  }
  const box = target.getBoundingClientRect()
  const offset = event.clientY - box.left - box.width / 2
  target.style = 'margin-left:10px'

  let toIndex = lists.length
  let fromIndex = 0
  for (let index = 0; index < lists.length; index++) {
    if (lists[index] === moveList._id) {
      fromIndex = index
    }
    if (lists[index]._id === target.id) {
      if (offset > 0) {
        toIndex = index + 1
      } else {
        toIndex = index
      }
    }
  }
  if (fromIndex < toIndex) {
    toIndex--
  }
  moveListFunction(
    boardId,
    boardId,
    moveList,
    toIndex,
    boards,
    lists,
    updateListsState,
    updateListMoveToggle,
    updateListActionToggle,
    updateBoardsState
  )
  dragListToggler(false)
}

export {
  dragStartListFunction,
  dragEndListFunction,
  dragOverListFunction,
  dropListFunction,
  dragListLeaveFunction
}
