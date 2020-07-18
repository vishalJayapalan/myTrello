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
import { getCookie } from '../util/cookies'
import dragCard from '../cards/dragCard'
import boardFunctions from '../boards/boardFunctions'

export default function Lists (props) {
  const [logout, setLogout] = useState(false)
  const [boards, setBoards] = useState([])
  const [lists, setLists] = useState([])
  // const [cardList, setCardList] = useState([])
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

  const [moveCardPosition, setMoveCardPosition] = useState([])
  const [moveCardShow, setMoveCardShow] = useState(false)
  const [inBoard, setInBoard] = useState([])
  const [inList, setInList] = useState(props.list)

  useEffect(() => {
    fetchList()
  }, [props.match.params.boardId])

  async function fetchList () {
    try {
      await fetchBoards()
      await fetchUsers()
      const data = await window.fetch(
        `http://localhost:8000/board/${props.match.params.boardId}`,
        {
          method: 'GET',
          headers: {
            'x-auth-token': getCookie('x-auth-token')
          }
        }
      )
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
      const { data, jsonData } = await boardFunctions.fetchBoardsFunction(
        getCookie
      )
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
    const response = await window.fetch('http://localhost:8000/user/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    const jsonResp = await response.json()
    setUsers(jsonResp)
  }

  async function createList (event) {
    const listName = event.target.value
    event.target.value = ''
    const data = await window.fetch(
      `http://localhost:8000/board/${props.match.params.boardId}`,
      {
        method: 'POST',
        body: JSON.stringify({ listName: listName }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    const jsonData = await data.json()
    setLists([...lists, { listName, _id: jsonData.listId, cards: [] }])
  }

  async function createCard (event, listId) {
    const boardId = props.match.params.boardId
    const cardName = event.target.value
    event.target.value = ''
    const data = await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}`,
      {
        method: 'POST',
        body: JSON.stringify({ cardName: cardName, description: '' }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    const jsonData = await data.json()
    const newLists = lists.map(list => {
      if (list._id === listId) {
        list.cards.push({ cardName, _id: jsonData.cardId })
      }
      return list
    })
    setLists(newLists)
  }

  function handleDragStartCard (event, card, listId) {
    event.persist()
    dragCard.dragStartCard(event, card, listId)
  }

  function handleDragEndCard (event) {
    event.persist()
    dragCard.dragEndCard(event)
  }

  function handleDragOverCard (event) {
    event.persist()
    dragCard.dragOverCard(event)
  }

  async function handleDropCard (event, listId) {
    event.persist()
    const boardId = props.match.params.boardId
    const prevListId = event.dataTransfer.getData('prevListId')
    const moveCard = JSON.parse(event.dataTransfer.getData('card'))
    await deleteCard(boardId, prevListId, moveCard._id)
    const { newLists, cardIndex } = dragCard.dropCard(
      event,
      listId,
      lists,
      moveCard
    )
    setLists(newLists)
    await createCardAtIndex(boardId, listId, cardIndex, moveCard)
  }

  async function createListAtIndex (boardId, list, listIndex) {
    await window.fetch(`http://localhost:8000/board/${boardId}/${listIndex}`, {
      method: 'POST',
      body: JSON.stringify(list),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
  }

  async function createCardAtIndex (boardId, listId, cardIndex, moveCard) {
    await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}/${cardIndex}`,
      {
        method: 'POST',
        body: JSON.stringify(moveCard),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
  }

  async function updateListName (event, listId) {
    const value = event.target.value
    const newLists = lists.map(list => {
      if (list._id === listId) {
        list.listName = value
      }
      return list
    })
    setLists(newLists)
    await window.fetch(
      `http://localhost:8000/board/${props.match.params.boardId}/${listId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ listName: value }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
  }

  async function updateBoard (name, value) {
    setBoard({ ...board, [name]: value })
    await window.fetch(`http://localhost:8000/${props.match.params.boardId}`, {
      method: 'PUT',
      body: JSON.stringify({ name: name, value: value }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
  }

  async function deleteBoard () {
    const boardId = props.match.params.boardId
    await window.fetch(`http://localhost:8000/${boardId}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    setBoardDeleted(true)
  }

  async function deleteList () {
    const newLists = lists.filter(lis => lis._id !== list._id)
    setLists(newLists)
    const boardId = props.match.params.boardId
    await window.fetch(`http://localhost:8000/board/${boardId}/${list._id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': getCookie('x-auth-token') }
    })
    setListActionToggle(false)
  }

  async function updateCard (name, cardName, listId, cardId) {
    const boardId = props.match.params.boardId
    const newLists = lists.map(list => {
      if (list._id === listId) {
        const newCards = list.cards.map(card => {
          if (card._id === cardId) {
            card[`${name}`] = cardName
          }
          return card
        })
        list.cards = newCards
      }

      return list
    })
    setLists(newLists)
    await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}/${cardId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ name: name, value: cardName }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
  }

  async function deleteCard (boardId, listId, cardId) {
    await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    const newLists = lists.map(list => {
      if (list._id === listId) {
        list.cards = list.cards.filter(card => card._id !== cardId)
      }
      return list
    })
    setLists(newLists)
  }

  function cardDetailsTogglerFunction (event, card, list) {
    event.stopPropagation()
    setCard(card)
    console.log(list)
    // setCardList(list)
    setList(list)
    setCardDetailToggle(!cardDetailToggle)
  }

  function cardEditTogglerFunction (e, card, list) {
    e.stopPropagation()
    const position = e.target.parentNode.getBoundingClientRect()
    setCard(card)
    // setCardList(list)
    setList(list)
    setCardEditToggle(!cardEditToggle)
    setCardPosition(position)
  }

  function updateNExitCardEdit (event, cardName, listId, cardId) {
    event.stopPropagation()
    updateCard('cardName', cardName, listId, cardId)
    setCardEditToggle(false)
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

  // just for testing
  function updateListState (newLists) {
    setLists(newLists)
  }

  async function handleMoveCard (
    fromBoardId,
    toBoardId,
    fromListId,
    toListId,
    card,
    toIndex = 0
  ) {
    const cardId = card._id
    // console.log('before', lists)
    await deleteCard(fromBoardId, fromListId, cardId)
    // console.log('after', lists)
    const newLists = lists.map(list => {
      if (list._id === toListId) {
        list.cards.splice(toIndex, 0, card)
      }
      return list
    })
    setLists(newLists)
    await createCardAtIndex(toBoardId, toListId, toIndex, card)
    closeMoveCard()
    setCardDetailToggle(false)
    setCardEditToggle(false)
  }

  async function viewUsers (event) {
    const box = event.target.getBoundingClientRect()
    setUsersPosition(box)
    setShowUsersToTeamToggle(!showUsersToTeamToggle)
  }

  function closeInviteToBoard () {
    setShowUsersToTeamToggle(false)
  }

  async function addTeamMember (event) {
    const teamMemberId = event.target.id
    const data = await window.fetch(
      `http://localhost:8000/team/${props.match.params.boardId}`,
      {
        method: 'POST',
        body: JSON.stringify({ teamMemberId: teamMemberId }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )

    const jsonData = await data.json()
    setBoard(jsonData)
  }

  async function removeTeamMember (event) {
    const teamMemberId = event.target.parentNode.id
    const data = await window.fetch(
      `http://localhost:8000/team/${props.match.params.boardId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ teamMemberId: teamMemberId }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    const jsonData = await data.json()
    setBoard(jsonData)
    if (teamMemberId === user._id) {
      setBoardDeleted(true)
    }
  }

  async function leaveBoard () {
    const data = await window.fetch(
      `http://localhost:8000/team/${props.match.params.boardId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ teamMemberId: user._id }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    const jsonData = await data.json()
    setBoard(jsonData)
    setBoardDeleted(true)
  }

  async function handleMoveList (fromBoardId, toBoardId, moveList, toIndex) {
    setList(moveList)
    await deleteList()

    const newBoards = boards.map(board => {
      if (board._id === fromBoardId) {
        const newLists = board.lists.filter(list => list._id !== moveList._id)
        board.lists = newLists
      }
      if (board._id === toBoardId) {
        board.lists.splice(toIndex, 0, list)
      }
      return board
    })
    setBoards(newBoards)
    const board = newBoards.filter(board => {
      return board._id === props.match.params.boardId
    })
    setLists(board[0].lists)
    setListMoveToggle(false)
    await createListAtIndex(toBoardId, moveList, toIndex)
  }

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
    setMoveCardPosition(position)
    setInBoard(boards.filter(board => board._id === props.match.params.boardId))
    setInList([list])
    setMoveCardShow(true)
  }

  function closeMoveCard (event) {
    setMoveCardShow(false)
  }

  async function changeInBoard (event) {
    await setInBoard(
      boards.filter(board => board.boardName === event.target.value)
    )
    await setInList([inBoard[0].lists[0]])
  }

  async function changeInList (event) {
    console.log('before', inList)
    await setInList(
      inBoard[0].lists.filter(list => list.listName === event.target.value)
    )
    console.log('after', inList)
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
            return updateBoard('boardName', e.target.value)
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
            dragOverCard={handleDragOverCard}
            dropCard={handleDropCard}
            dragStartCard={handleDragStartCard}
            dragEndCard={handleDragEndCard}
            updateListName={updateListName}
            createCard={createCard}
            openListActions={ListActionsTogglerFunction}
          />
        ))}
        <div className='newList'>
          <input
            className='createNewList'
            placeholder='+ Add Another List...'
            onKeyUp={event => {
              if (event.target.value && event.keyCode === 13) {
                return createList(event)
              }
            }}
          />
        </div>
      </div>
      {cardDetailToggle && (
        <CardDetails
          card={card}
          list={list}
          boards={boards}
          openMoveCard={openMoveCard}
          closeMoveCard={closeMoveCard}
          boardId={props.match.params.boardId}
          detailShow={cardDetailToggle}
          exitCardDetails={cardDetailsTogglerFunction}
          updateCard={updateCard}
          deleteCard={deleteCard}
          handleMoveCard={handleMoveCard}
        />
      )}
      {cardEditToggle && (
        <CardEdit
          cardEditShow={cardEditToggle}
          boardId={props.match.params.boardId}
          card={card}
          list={list}
          openMoveCard={openMoveCard}
          closeMoveCard={closeMoveCard}
          updateNExitCardEdit={updateNExitCardEdit}
          exitCardEdit={cardEditTogglerFunction}
          cardPosition={cardPosition}
          deleteCard={deleteCard}
        />
      )}
      {listActionToggle && (
        <ListActions
          listActionShow={listActionToggle}
          listPosition={listPosition}
          closeListActions={ListActionsTogglerFunction}
          deleteList={deleteList}
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
          onMoveList={handleMoveList}
        />
      )}
      {showMenuToggle && (
        <ShowMenuComponent
          showMenuToggle={showMenuToggle}
          showMenuToggler={showMenuTogglerFunction}
          deleteBoard={deleteBoard}
          user={user}
          board={board}
          leaveBoard={leaveBoard}
          updateBoard={updateBoard}
        />
      )}
      {showUsersToTeamToggle && (
        <InviteToBoard
          users={users}
          usersPosition={usersPosition}
          closeInviteToBoard={closeInviteToBoard}
          addTeamMember={addTeamMember}
          team={board.team}
        />
      )}
      {showMembersToggle && (
        <ShowMembers
          users={users}
          teamPosition={teamViewPosition}
          team={board.team}
          showMembers={showMembers}
          removeTeamMember={removeTeamMember}
          board={board}
        />
      )}
      {moveCardShow && (
        <MoveCard
          moveCardPosition={moveCardPosition}
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
          onMoveCard={handleMoveCard}
          updateListState={updateListState}
          lists={lists}
          deleteCard={deleteCard}
        />
      )}
    </div>
  )
}
