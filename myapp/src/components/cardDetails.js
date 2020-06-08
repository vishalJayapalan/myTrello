import React from 'react'

export default function CardDetails (props) {
  return (
    <div className='overlay'>
      <div className='cardDetailsContainer' onBlur={e => props.exitCardDetails}>
        <div className='nameCardDetails'>
          {/* <h3>{props.cardName}</h3> */}
          <textarea className='cardName' value={props.cardName} />
          <p>
            in list <b>{props.list.listName}</b>
          </p>
        </div>
        <div className='cardDescription'>
          <label>description</label>
          <textarea
            className='cardDescriptionText'
            placeholder='Add a more detailed Description'
          />
        </div>
        <div className='cardComments'>
          <label>Activity</label>
          <textarea
            className='cardDescriptionText'
            placeholder='write a comment'
          />
        </div>
        <i className='fas fa-times closeCardDetail' />
        <div className='cardSideBar'>
          <div>
            <h3>ADD TO CARD</h3>
            <div>
              <a className='darker'>Members</a>
            </div>
            <div>
              <a className='darker'>Labels</a>
            </div>

            <div>
              <a className='darker'>CheckList</a>
            </div>
            <div>
              <a className='darker'>DueDate</a>
            </div>
            <div>
              <a className='darker'>Attachment</a>
            </div>
            <div>
              <a className='darker'>Cover</a>
            </div>
          </div>
          <div>
            <h3>ACTIONS</h3>
            <div>
              <a className='darker'>Move</a>
            </div>
            <div>
              <a className='darker'>Copy</a>
            </div>
            <div>
              <a className='darker'>Make Template</a>
            </div>
            <div>
              <a className='darker'>Watch</a>
            </div>
            <div>
              <a className='darker'>Archive</a>
            </div>
            <div>
              <a className='darker'>Share</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
