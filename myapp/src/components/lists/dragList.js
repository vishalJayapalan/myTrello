function dragStartListFunction (event, list) {
  const target = event.target
  event.dataTransfer.setData('list', JSON.stringify(list))
  //   event.dataTransfer.setData('prevListId', listId)
  //   event.target.classList.add('dragging')

  setTimeout(() => {
    target.style.display = 'none'
  }, 0)
}

function dragEndListFunction (event) {
  event.target.style.display = 'flex'
}

function dragOverListFunction (event) {
  event.preventDefault()
  const target = event.target
  const childs = event.target.parentNode.childNodes
  for (const child of Array.from(childs)) {
    if (child.style.display !== 'none') child.style = 'margin-left:10px'
  }
  target.style = 'margin-left:30px'
}
const dragListLeaveFunction = event => {
  event.currentTarget.style = 'margin-left:5px'
}

function dropListFunction (event, listId, lists, moveCard) {
  //   const boardId = props.match.params.boardId
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

  return { newLists, cardIndex }
}

export {
  dragStartListFunction,
  dragEndListFunction,
  dragOverListFunction,
  dropListFunction,
  dragListLeaveFunction
}
