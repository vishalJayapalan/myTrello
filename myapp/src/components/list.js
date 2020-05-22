import React, { useState } from 'react'
import Card from './card'
// import Cards from './cards'

function List (props) {
  const [cards, setCards] = useState(props.list.cards)
  // console.log(cards)

  async function createCard (event) {
    const boardId = props.boardId
    const listId = props.list._id
    const cardName = event.target.value
    event.target.value = ''
    console.log(cardName)
    const data = await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}`,
      {
        method: 'POST',
        body: JSON.stringify({ cardName: cardName }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    const jsonData = await data.json()
    setCards([...cards, { cardName, _id: jsonData.cardId }])
  }

  return (
    <div className='listContainer'>
      <h4 className='listName'>{props.list.listName}</h4>
      <div className='cardContainer'>
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            handleDragStart={props.dragStart}
            handleDragEnd={props.dragEnd}
          />
        ))}
        <input
          className='newCardInput'
          onKeyUp={e => {
            if (e.target.value && e.keyCode === 13) {
              return createCard(e)
            }
          }}
          placeholder='Add New Card....'
        />
      </div>
    </div>
  )
}

export default List
