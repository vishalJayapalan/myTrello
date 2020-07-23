let inHere = false

function dragStartListFunction (event, list) {
  const target = event.target
  // console.log(target)
  event.stopPropagation()
  console.log('inHere')
  inHere = true
  event.dataTransfer.setData('type', 'list')
  event.dataTransfer.setData('list', JSON.stringify(list))

  setTimeout(() => {
    target.style.display = 'none'
  }, 0)
}

function dragEndListFunction (event) {
  event.preventDefault()
  event.stopPropagation()

  const target = event.target
  // console.log(target.className)
  if (target.className === 'newList' || target.className === 'listContainer') {
    target.style.display = 'block'
  }
  inHere = false
}

function dragOverListFunction (event) {
  event.preventDefault()
  event.stopPropagation()
  console.log(inHere)
  if (inHere) {
    const target = event.target
    console.log(target.className)
    if (
      target.className === 'newList' ||
      target.className === 'listContainer' ||
      target.className === 'listContainer' ||
      target.className === 'listNameContainer'
    ) {
      // console.log(target)
      const childs = event.target.parentNode.childNodes
      for (const child of Array.from(childs)) {
        if (child.style.display !== 'none') child.style = 'margin-left:10px'
      }
      target.style = 'margin-left:30px'
    }
  }
}

const dragListLeaveFunction = event => {
  event.preventDefault()
  event.stopPropagation()

  const target = event.target
  // console.log(target.className)
  if (target.className === 'newList' || target.className === 'listContainer') {
    event.currentTarget.style = 'margin-left:10px'
  }
}

function dropListFunction (event, listId, lists, moveCard) {
  event.stopPropagation()

  //   const boardId = props.match.params.boardId
  // const target = event.target
  // let cardIndex = 0
  // const box = target.getBoundingClientRect()
  // const offset = event.clientY - box.top - box.height / 2
  // target.style = 'margin-top:5px'
  // const newLists = lists.map(list => {
  //   if (list._id === listId) {
  //     let index = list.cards.length
  //     for (let i = 0; i < list.cards.length; i++) {
  //       if (list.cards[i]._id === target.id) {
  //         if (offset > 0) {
  //           index = i + 1
  //         } else {
  //           index = i
  //         }
  //       }
  //     }
  //     cardIndex = index
  //     list.cards.splice(index, 0, moveCard)
  //   }
  //   return list
  // })
  // return { newLists, cardIndex }
}

export {
  dragStartListFunction,
  dragEndListFunction,
  dragOverListFunction,
  dropListFunction,
  dragListLeaveFunction
}
