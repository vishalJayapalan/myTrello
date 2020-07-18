function dragStartCard (event, card, listId) {
  const target = event.target
  event.dataTransfer.setData('card', JSON.stringify(card))
  event.dataTransfer.setData('prevListId', listId)
  event.target.classList.add('dragging')

  setTimeout(() => {
    target.style.display = 'none'
  }, 0)
}

function dragEndCard (event) {
  event.target.style.display = 'flex'
}

function dragOverCard (event) {
  event.preventDefault()
  const childs = event.target.parentNode.childNodes
  for (const child of Array.from(childs)) {
    child.style = 'margin-top:10px'
  }
  event.target.style = 'margin-top:20px'
}

function dropCard (event, listId, lists, moveCard) {
  console.log('inDropFunction', lists)
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
    console.log(list.cards)
    return list
  })

  return { newLists, cardIndex }
}

module.exports = { dragStartCard, dragEndCard, dragOverCard, dropCard }
