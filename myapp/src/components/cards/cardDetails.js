import React from 'react'
import { deleteCardFunction, updateCardFunction } from './cardFunctions'
import { getCookie } from '../util/cookies'

export default function CardDetails (props) {
  return (
    <div
      className='overlay'
      onClick={e => {
        if (e.target.className === 'overlay') {
          props.closeCardEditAndDetail()
        }
      }}
    >
      <div className='cardDetailsContainer'>
        <div className='nameCardDetails'>
          <textarea
            className='cardName'
            defaultValue={props.card.cardName}
            spellCheck='false'
            onBlur={e =>
              updateCardFunction(
                props.boardId,
                props.lists,
                'cardName',
                e.target.value,
                props.list._id,
                props.card._id,
                getCookie,
                props.updateListsState
              )
            }
          />
          <p>
            in list <b>{props.list.listName}</b>
          </p>
        </div>
        <div className='cardDescription'>
          <label>description</label>
          <textarea
            className='cardDescriptionText'
            placeholder='Add a more detailed Description'
            value={props.card.cardDescription}
            onChange={e =>
              updateCardFunction(
                props.boardId,
                props.lists,
                'cardDescription',
                e.target.value,
                props.list._id,
                props.card._id,
                getCookie,
                props.updateListsState
              )
            }
          />
        </div>
        <i
          className='fas fa-times closeCardDetail'
          onClick={e => props.exitCardDetails(e)}
        />
        <div className='cardSideBar'>
          <div>
            <h3>ADD TO CARD</h3>
            <div>
              <a className='darker'>DueDate</a>
            </div>
          </div>
          <div>
            <h3>ACTIONS</h3>
            <div>
              <a className='darker' onClick={e => props.openMoveCard(e)}>
                Move
              </a>
            </div>
            <div>
              <a className='darker' onClick={e => props.copyCardToggler(e)}>
                Copy
              </a>
            </div>

            <div>
              <a
                className='darker'
                onClick={e => {
                  deleteCardFunction(
                    props.boardId,
                    props.lists,
                    props.list._id,
                    props.card._id,
                    getCookie,
                    props.updateListsState
                  )
                  props.exitCardDetails(e)
                }}
              >
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
