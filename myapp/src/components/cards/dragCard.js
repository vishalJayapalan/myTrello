import { getCookie } from '../util/cookies'

import { deleteCardFunction, createCardAtIndexFunction } from './cardFunctions'

function dragStartCardFunction (event, card, listId) {
  const target = event.target
  event.stopPropagation()
  event.dataTransfer.setData('type', 'card')
  event.dataTransfer.setData('card', JSON.stringify(card))
  event.dataTransfer.setData('prevListId', listId)

  setTimeout(() => {
    target.style.display = 'none'
  }, 0)
}

function dragEndCardFunction (event) {
  // console.log(event.target)
  event.stopPropagation()

  // console.log('end', event.dataTransfer.getData('type'))

  if (event.target.className === 'card') event.target.style.display = 'flex'
}

function dragOverCardFunction (event) {
  // console.log(event.target)
  // console.log(moveCard)
  event.preventDefault()
  event.stopPropagation()

  const target = event.target
  if (event.target.className === 'newCardInput') {
    target.style = 'margin-top:20px'
  }
  // console.log(target.className.includes('card'))
  if (target.id && target.className === 'card') {
    const childs = event.target.parentNode.childNodes
    for (const child of Array.from(childs)) {
      // console.log(child)
      if (child.style.display !== 'none') {
        child.style = 'margin-top:5px'
      }
    }
    target.style = 'margin-top:20px'
  }
}

const dragCardLeaveFunction = event => {
  // console.log('leave-type', event.dataTransfer.getData('type'))
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
  // console.log('drop-type', event.dataTransfer.getData('type') === 'card')

  // const boardId = props.boardId
  if (event.dataTransfer.getData('type') === 'card') {
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
        // console.log(list.cards)
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
  }
}

// function dropCardFunction (event, listId, lists, moveCard) {
//   //   const boardId = props.match.params.boardId
//   const target = event.target
//   let cardIndex = 0

//   const box = target.getBoundingClientRect()
//   const offset = event.clientY - box.top - box.height / 2
//   target.style = 'margin-top:5px'

//   const newLists = lists.map(list => {
//     if (list._id === listId) {
//       let index = list.cards.length
//       for (let i = 0; i < list.cards.length; i++) {
//         if (list.cards[i]._id === target.id) {
//           if (offset > 0) {
//             index = i + 1
//           } else {
//             index = i
//           }
//         }
//       }
//       cardIndex = index
//       list.cards.splice(index, 0, moveCard)
//       // console.log(list.cards)
//     }
//     return list
//   })

//   return { newLists, cardIndex }
// }

export {
  dragStartCardFunction,
  dragEndCardFunction,
  dragOverCardFunction,
  dropCardFunction,
  // handleDropCard,
  dragCardLeaveFunction
}
