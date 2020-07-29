import { getCookie } from '../util/cookies'

import { deleteCardFunction, createCardAtIndexFunction } from './cardFunctions'

function dragStartCardFunction (event, card, listId, dragCardToggler) {
  const target = event.target
  event.stopPropagation()
  event.dataTransfer.setData('card', JSON.stringify(card))
  event.dataTransfer.setData('prevListId', listId)
  dragCardToggler(true)
  setTimeout(() => {
    target.style.display = 'none'
  }, 0)
}

function dragEndCardFunction (event, dragCardToggler) {
  event.stopPropagation()
  dragCardToggler(false)
  event.target.style.display = 'flex'
}

function dragOverCardFunction (event) {
  event.preventDefault()
  event.stopPropagation()

  const target = event.target
  if (event.target.className === 'newCardInput') {
    target.style = 'margin-top:20px'
  }
  if (target.id && target.className === 'card') {
    const childs = event.target.parentNode.childNodes
    for (const child of Array.from(childs)) {
      if (child.style.display !== 'none') {
        child.style = 'margin-top:5px'
      }
    }
    target.style = 'margin-top:20px'
  }
}

const dragCardLeaveFunction = event => {
  event.stopPropagation()
  event.currentTarget.style = 'margin-top:5px'
}

async function dropCardFunction (
  event,
  boardId,
  lists,
  listId,
  updateListsState
) {
  event.persist()
  event.stopPropagation()
  const prevListId = event.dataTransfer.getData('prevListId')
  const moveCard = JSON.parse(event.dataTransfer.getData('card'))
  await deleteCardFunction(
    boardId,
    lists,
    prevListId,
    moveCard._id,
    getCookie,
    updateListsState
  )

  const target = event.target
  let cardIndex = 0

  const box = target.getBoundingClientRect()
  const offset = event.clientY - box.top - box.height / 2
  target.style = 'margin-top:5px'

  const newLists = lists.map(list => {
    if (list._id === listId) {
      let index = list.cards.length
      for (let i = 0; i < list.cards.length; i++) {
        if (list.cards[i]._id === target.id) {
          if (offset > 0) {
            index = i + 1
          } else {
            index = i
          }
        }
      }
      cardIndex = index
      list.cards.splice(index, 0, moveCard)
    }
    return list
  })

  updateListsState(newLists)
  await createCardAtIndexFunction(
    boardId,
    listId,
    cardIndex,
    moveCard,
    getCookie
  )
  // }
}

export {
  dragStartCardFunction,
  dragEndCardFunction,
  dragOverCardFunction,
  dropCardFunction,
  dragCardLeaveFunction
}
