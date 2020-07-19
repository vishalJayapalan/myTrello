function dragStartCardFunction (event, card, listId) {
  const target = event.target
  event.dataTransfer.setData('card', JSON.stringify(card))
  event.dataTransfer.setData('prevListId', listId)
  event.target.classList.add('dragging')

  setTimeout(() => {
    target.style.display = 'none'
  }, 0)
}

function dragEndCardFunction (event) {
  event.target.style.display = 'flex'
}

function dragOverCardFunction (event) {
  event.preventDefault()
  const childs = event.target.parentNode.childNodes
  for (const child of Array.from(childs)) {
    child.style = 'margin-top:10px'
  }
  event.target.style = 'margin-top:20px'
}

function dropCardFunction (event, listId, lists, moveCard) {
  //   const boardId = props.match.params.boardId
  const target = event.target
  target.style = 'margin-top:10px'
  let cardIndex = 0

  const box = target.getBoundingClientRect()
  const offset = event.clientY - box.top - box.height / 2

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

  return { newLists, cardIndex }
}

// async function dropCardFunction (event, boardId, listId) {
//   // const boardId = props.match.params.boardId
//   const target = event.target
//   target.style = 'margin-top:10px'
//   let cardIndex = 0
//   const box = target.getBoundingClientRect()
//   const offset = event.clientY - box.top - box.height / 2
//   // const cardId = event.dataTransfer.getData('cardId')
//   const moveCard = JSON.parse(event.dataTransfer.getData('card'))
//   // const cardName = event.dataTransfer.getData('cardName')
//   const prevListId = event.dataTransfer.getData('prevListId')
//   // let moveCard
//   // lists.forEach(list => {
//   //   if (list._id === prevListId) {
//   //     moveCard = list.cards.filter(card => card._id === cardId)[0]
//   //   }
//   // })
//   await deleteCardFunction(boardId,lists, prevListId, cardId,getCookie,updateListState)
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
//     }
//     return list
//   })
//   setLists(newLists)
//   await createCardAtIndex(boardId, listId, cardIndex, moveCard)
// }

export {
  dragStartCardFunction,
  dragEndCardFunction,
  dragOverCardFunction,
  dropCardFunction
}
