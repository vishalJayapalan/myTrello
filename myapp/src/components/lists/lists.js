import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/navbar.js'
import List from './list'
import CardDetails from '../cards/cardDetails'
import CardEdit from '../cards/cardEdit'
import ListActions from '../lists/listActions.js'
import MoveList from '../lists/moveList'
import PageNotFound from '../pageNotFound/pageNotFound'
import { Redirect } from 'react-router-dom'
import ShowMenuComponent from './showMenu'
import InviteToBoard from './inviteToBoard.js'
import ShowMembers from './showMembers'
import MoveCard from '../cards/moveCard'
import CopyCard from '../cards/copyCard'
import { getCookie } from '../util/cookies'
import {
  updateBoardFunction,
  fetchBoardsFunction
} from '../boards/boardFunctions'
import { deleteList, createList, createListAtIndex } from './listFunctions'
import {
  dragListLeaveFunction,
  dropListFunction,
  dragOverListFunction,
  dragEndListFunction
} from './dragList'

export default function Lists (props) {
  const [logout, setLogout] = useState(false)
  const [boards, setBoards] = useState([])
  const [lists, setLists] = useState([])
  const [card, setCard] = useState([])
  const [board, setBoard] = useState([])
  const [list, setList] = useState([])
  const [listActionToggle, setListActionToggle] = useState(false)
  const [cardDetailToggle, setCardDetailToggle] = useState(false)
  const [cardEditToggle, setCardEditToggle] = useState(false)
  const [cardPosition, setCardPosition] = useState([])
  const [listPosition, setListPosition] = useState([])
  const [routeErrors, setRouteErrors] = useState(false)
  const [showMenuToggle, setShowMenuToggle] = useState(false)
  const [boardDeleted, setBoardDeleted] = useState(false)
  const [listMoveToggle, setListMoveToggle] = useState(false)
  const [toBoard, setToBoard] = useState([])
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])
  const [usersPosition, setUsersPosition] = useState([])
  const [teamViewPosition, setTeamViewPosition] = useState([])

  const [showUsersToTeamToggle, setShowUsersToTeamToggle] = useState(false)
  const [showMembersToggle, setShowMembersToggle] = useState(false)

  const [moveOrCopyCardPosition, setMoveOrCopyCardPosition] = useState([])
  const [moveCardShow, setMoveCardShow] = useState(false)
  const [copyCardShow, setCopyCardShow] = useState(false)
  const [inBoard, setInBoard] = useState([])
  const [inList, setInList] = useState(props.list)

  const [dragCard, setDragCard] = useState(false)
  const [dragList, setDragList] = useState(false)

  useEffect(() => {
    fetchList()
  }, [props.match.params.boardId])

  async function fetchList () {
    try {
      await fetchBoards()
      await fetchUsers()
      const data = await window.fetch(`board/${props.match.params.boardId}`, {
        method: 'GET',
        headers: {
          'x-auth-token': getCookie('x-auth-token')
        }
      })
      if (data.status >= 200 && data.status < 300) {
        const jsonData = await data.json()
        setBoard(jsonData)
        setLists(jsonData.lists)
      } else {
        throw new Error(data.statusText)
      }
    } catch (err) {
      setRouteErrors(true)
    }
  }

  async function fetchBoards () {
    try {
      const { data, jsonData } = await fetchBoardsFunction(getCookie)
      if (!(data.status >= 200 && data.status < 300)) {
        throw new Error(data.statusText)
      }
      setUser(jsonData.user)
      setBoards(jsonData.boards)
    } catch (err) {
      setLogout(true)
    }
  }

  async function fetchUsers () {
    const response = await window.fetch('/user/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    const jsonResp = await response.json()
    setUsers(jsonResp)
  }

  function updateBoardState (name, value) {
    setBoard({ ...board, [name]: value })
  }

  function updateBoardDeletedState () {
    setBoardDeleted(true)
  }

  function cardDetailsTogglerFunction (event, card, list) {
    event.stopPropagation()
    setCard(card)
    setList(list)
    setCardDetailToggle(!cardDetailToggle)
  }

  function cardEditTogglerFunction (e, card, list) {
    e.stopPropagation()
    const position = e.target.parentNode.getBoundingClientRect()
    setCard(card)
    setList(list)
    setCardEditToggle(!cardEditToggle)
    setCardPosition(position)
  }
  function closeCardEditAndDetail () {
    setCardDetailToggle(false)
    setCardEditToggle(false)
    setMoveCardShow(false)
    setCopyCardShow(false)
  }

  function ListActionsTogglerFunction (e, list) {
    setList(list)
    const box = e.target.getBoundingClientRect()
    setListPosition(box)
    setToBoard(boards.filter(board => board._id === props.match.params.boardId))
    setListActionToggle(!listActionToggle)
  }

  function moveListToggler () {
    setListMoveToggle(!listMoveToggle)
    setListActionToggle(false)
  }

  async function changeToBoard (boardName) {
    await setToBoard(boards.filter(board => board.boardName === boardName))
  }

  function updateListsState (newLists) {
    setLists(newLists)
  }

  function updateListActionToggle () {
    setListActionToggle(false)
  }

  function updateListMoveToggle () {
    setListMoveToggle(false)
  }

  function updateBoardsState (newBoards) {
    setBoards(newBoards)
  }

  async function viewUsers (event) {
    const box = event.target.getBoundingClientRect()
    setUsersPosition(box)
    setShowUsersToTeamToggle(!showUsersToTeamToggle)
  }

  function closeInviteToBoard () {
    setShowUsersToTeamToggle(false)
  }

  // async function handleMoveList (fromBoardId, toBoardId, moveList, toIndex) {
  //   setList(moveList)
  //   await deleteList(
  //     fromBoardId,
  //     lists,
  //     list,
  //     updateListsState,
  //     updateListActionToggle
  //   )

  //   const newBoards = boards.map(board => {
  //     if (board._id === fromBoardId) {
  //       const newLists = board.lists.filter(list => list._id !== moveList._id)
  //       board.lists = newLists
  //     }
  //     if (board._id === toBoardId) {
  //       board.lists.splice(toIndex, 0, list)
  //     }
  //     return board
  //   })
  //   setBoards(newBoards)
  //   const board = newBoards.filter(board => {
  //     return board._id === props.match.params.boardId
  //   })
  //   setLists(board[0].lists)
  //   setListMoveToggle(false)
  //   await createListAtIndex(toBoardId, moveList, toIndex)
  // }

  function showMenuTogglerFunction () {
    setShowMenuToggle(!showMenuToggle)
  }

  function showMembers (event) {
    const box = event.target.getBoundingClientRect()
    setTeamViewPosition(box)
    setShowMembersToggle(!showMembersToggle)
  }

  function openMoveCard (event) {
    const position = event.target.getBoundingClientRect()
    setMoveOrCopyCardPosition(position)
    setInBoard(boards.filter(board => board._id === props.match.params.boardId))
    setInList([list])
    setMoveCardShow(true)
  }

  function closeMoveCard (event) {
    setMoveCardShow(false)
  }

  function copyCardToggler (event) {
    const position = event.target.getBoundingClientRect()
    setMoveOrCopyCardPosition(position)
    setInBoard(boards.filter(board => board._id === props.match.params.boardId))
    setInList([list])
    setCopyCardShow(!copyCardShow)
  }

  function dragCardToggler (dragStatus) {
    setDragCard(dragStatus)
  }

  function dragListToggler (dragStatus) {
    console.log(dragStatus)
    setDragList(dragStatus)
  }

  async function changeInBoard (event) {
    await setInBoard(
      boards.filter(board => board.boardName === event.target.value)
    )
    await setInList([inBoard[0].lists[0]])
  }

  async function changeInList (event) {
    await setInList(
      inBoard[0].lists.filter(list => list.listName === event.target.value)
    )
  }

  function renderRedirect () {
    if (boardDeleted) {
      return <Redirect to='/' />
    }
  }
  return logout ? (
    <Redirect to='/login' />
  ) : routeErrors ? (
    <PageNotFound />
  ) : (
    <div className='listsWithBoardName'>
      <Navbar user={user} />
      {renderRedirect()}
      <div className='listNavbar'>
        <input
          defaultValue={board.boardName}
          spellCheck='false'
          className='boardNameInList'
          onBlur={e => {
            return updateBoardFunction(
              props.match.params.boardId,
              'boardName',
              e.target.value,
              getCookie,
              updateBoardState
            )
          }}
        />
        <p className='showMembers' onClick={showMembers}>
          team
        </p>
        <p className='inviteToBoard' onClick={viewUsers}>
          invite
        </p>
        <p className='showMenu' onClick={() => showMenuTogglerFunction()}>
          Show menu...
        </p>
      </div>
      <div className='listsContainer'>
        {lists.map(list => (
          <List
            displayCardFunction={cardDetailsTogglerFunction}
            cardEditFunction={cardEditTogglerFunction}
            exitCardDetails={cardDetailsTogglerFunction}
            cardDetailToggle={cardDetailToggle}
            key={list._id}
            list={list}
            lists={lists}
            boards={boards}
            updateListActionToggle={updateListActionToggle}
            updateBoardsState={updateBoardsState}
            updateListMoveToggle={updateListMoveToggle}
            boardId={props.match.params.boardId}
            updateListsState={updateListsState}
            openListActions={ListActionsTogglerFunction}
            dragCardToggler={dragCardToggler}
            dragListToggler={dragListToggler}
            dragList={dragList}
            dragCard={dragCard}
          />
        ))}
        <div className='newList'>
          <input
            className='createNewList'
            placeholder='+ Add Another List...'
            onKeyUp={event => {
              if (event.target.value && event.keyCode === 13) {
                return createList(
                  event,
                  props.match.params.boardId,
                  lists,
                  updateListsState
                )
              }
            }}
            onDragEnd={e => dragList && dragEndListFunction(e, dragListToggler)}
            onDragOver={e => dragList && dragOverListFunction(e)}
            onDrop={e => {
              dragList &&
                dropListFunction(
                  e,
                  props.match.params.boardId,
                  lists,
                  boards,
                  updateListsState,
                  updateListActionToggle,
                  updateListMoveToggle,
                  updateBoardsState,
                  dragListToggler
                )
            }}
            onDragLeave={e => dragList && dragListLeaveFunction(e)}
          />
        </div>
      </div>
      {cardDetailToggle && (
        <CardDetails
          card={card}
          list={list}
          lists={lists}
          boards={boards}
          openMoveCard={openMoveCard}
          closeMoveCard={closeMoveCard}
          boardId={props.match.params.boardId}
          detailShow={cardDetailToggle}
          exitCardDetails={cardDetailsTogglerFunction}
          updateListsState={updateListsState}
          copyCardToggler={copyCardToggler}
          closeCardEditAndDetail={closeCardEditAndDetail}
        />
      )}
      {cardEditToggle && (
        <CardEdit
          cardEditShow={cardEditToggle}
          boardId={props.match.params.boardId}
          card={card}
          list={list}
          lists={lists}
          openMoveCard={openMoveCard}
          closeMoveCard={closeMoveCard}
          exitCardEdit={cardEditTogglerFunction}
          cardPosition={cardPosition}
          updateListsState={updateListsState}
          copyCardToggler={copyCardToggler}
          closeCardEditAndDetail={closeCardEditAndDetail}
        />
      )}
      {listActionToggle && (
        <ListActions
          listActionShow={listActionToggle}
          listPosition={listPosition}
          closeListActions={ListActionsTogglerFunction}
          lists={lists}
          list={list}
          boardId={props.match.params.boardId}
          updateListsState={updateListsState}
          updateListActionToggle={updateListActionToggle}
          openMoveList={moveListToggler}
        />
      )}
      {listMoveToggle && (
        <MoveList
          listPosition={listPosition}
          listMoveShow={listMoveToggle}
          boards={boards}
          boardId={props.match.params.boardId}
          list={list}
          lists={lists}
          closeMoveList={moveListToggler}
          board={board}
          toBoard={toBoard}
          changeToBoard={changeToBoard}
          // onMoveList={handleMoveList}
          updateListsState={updateListsState}
          updateListMoveToggle={updateListMoveToggle}
          cardEditTogglerFunction={cardEditTogglerFunction}
          updateListActionToggle={updateListActionToggle}
          updateBoardsState={updateBoardsState}
        />
      )}
      {showMenuToggle && (
        <ShowMenuComponent
          showMenuToggle={showMenuToggle}
          showMenuToggler={showMenuTogglerFunction}
          updateBoardDeletedState={updateBoardDeletedState}
          user={user}
          board={board}
          updateBoardState={updateBoardState}
        />
      )}
      {showUsersToTeamToggle && (
        <InviteToBoard
          users={users}
          usersPosition={usersPosition}
          closeInviteToBoard={closeInviteToBoard}
          team={board.team}
          board={board}
          updateBoardState={updateBoardState}
        />
      )}
      {showMembersToggle && (
        <ShowMembers
          users={users}
          user={user}
          teamPosition={teamViewPosition}
          board={board}
          showMembers={showMembers}
          updateBoardState={updateBoardState}
          updateBoardDeletedState={updateBoardDeletedState}
        />
      )}
      {moveCardShow && (
        <MoveCard
          moveOrCopyCardPosition={moveOrCopyCardPosition}
          cardMoveShow={moveCardShow}
          closeMoveCard={closeMoveCard}
          card={card}
          list={list}
          boards={boards}
          boardId={props.match.params.boardId}
          inList={inList}
          changeInList={changeInList}
          inBoard={inBoard}
          changeInBoard={changeInBoard}
          updateListsState={updateListsState}
          lists={lists}
          closeCardEditAndDetail={closeCardEditAndDetail}
        />
      )}
      {copyCardShow && (
        <CopyCard
          moveOrCopyCardPosition={moveOrCopyCardPosition}
          copyCardToggler={copyCardToggler}
          card={card}
          list={list}
          boards={boards}
          boardId={props.match.params.boardId}
          inList={inList}
          changeInList={changeInList}
          inBoard={inBoard}
          changeInBoard={changeInBoard}
          updateListsState={updateListsState}
          lists={lists}
          closeCardEditAndDetail={closeCardEditAndDetail}
        />
      )}
    </div>
  )
}
