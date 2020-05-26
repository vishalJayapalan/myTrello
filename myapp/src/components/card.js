import React from 'react'

export default function card (props) {
  return (
    <div>
      <p
        className='card draggable'
        onDragStart={e =>
          props.dragStart(e, props.card._id, props.card.cardName, props.listId)
        }
        draggable='true'
      >
        {props.card.cardName}
      </p>
      <img
        src='/home/vishaljayapalan/geekSkool/myTrello/myapp/src/components/edit.png'
        alt='edit'
      />
    </div>
  )
}
