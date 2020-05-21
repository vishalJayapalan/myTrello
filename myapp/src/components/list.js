import React, { useState } from 'react'
import Card from './card'

function List (props) {
  console.log(props)
  const [cards, setCards] = useState([])
  setCards(props.list.cards)
  return (
    <div className='listContainer'>
      <div className='cardContainer'>
        {cards.map(card => (
          <Card key={card._id} card={card} />
        ))}
        {/* <Cards props.list.cards/> */}
      </div>
      <p>{props.list.listName}</p>
    </div>
  )
}

export default List
