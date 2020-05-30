import React from 'react'
import card from './card'

export default function CardDetails (props) {
  return (
    <div>
      <h4>{props.card.cardName}</h4>
      <p>in list {props.list.listName}</p>
      <label>description</label>
      <textarea placeholder='Add a more detailed Description' />
      <label>Activity</label>
      <textarea placeholder='write a comment' />
    </div>
  )
}
