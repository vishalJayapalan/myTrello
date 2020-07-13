import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/navbar.js'
import List from './list'
import CardDetails from '../cards/cardDetails'
import CardEdit from '../cards/cardEdit'
import ListActions from '../lists/listActions.js'
import MoveList from '../lists/moveList'
// import CopyList from './copyCard'
import PageNotFound from '../pageNotFound/pageNotFound'
import { Redirect } from 'react-router-dom'
import ShowMenuComponent from './showMenu'
import AboutBoard from './aboutBoard'
import InviteToBoard from './inviteToBoard.js'
import ShowMembers from './showMembers'
import MoveCard from '../cards/moveCard'

// import { addTeamMember } from '../../../backend/controllers/board.js'
// import ShowMenu from './showMenu.js'

export default function Lists (props) {
  const [logout, setLogout] = useState(false)
  const [boards, setBoards] = useState([])
  const [lists, setLists] = useState([])
  const [cardList, setCardList] = useState([])
  const [card, setCard] = useState([])
  const [board, setBoard] = useState([])
  const [boardName, setBoardName] = useState([])
  const [list, setList] = useState([])
  const [listActionToggle, setListActionToggle] = useState(false)
  const [cardDetailToggle, setCardDetailToggle] = useState(false)
  const [cardEditToggle, setCardEditToggle] = useState(false)
  const [cardPosition, setCardPosition] = useState([])
  const [listPosition, setListPosition] = useState([])
  const [routeErrors, setRouteErrors] = useState(false)
  const [showMenuToggle, setShowMenuToggle] = useState(false)
  const [showAboutBoardToggle, setShowAboutBoardToggle] = useState(false)
  const [boardDeleted, setBoardDeleted] = useState(false)
  const [listMoveToggle, setListMoveToggle] = useState(false)
  const [toBoard, setToBoard] = useState([])
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])
  // const [team, setTeam] = useState([])
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
      await fetchUser()
      await fetchUsers()
      const data = await window.fetch(
        `http://localhost:8000/board/${props.match.params.boardId}`,
        {
          method: 'GET',
          credencials: 'include',
          headers: {
            'x-auth-token': getCookie('x-auth-token')
          }
        }
      )
      if (data.status >= 200 && data.status < 300) {
        const jsonData = await data.json()
        setBoardName(jsonData.boardName)
        setBoard(jsonData)
        setLists(jsonData.lists)
        fetchBoard()
      } else {
        throw new Error(data.statusText)
      }
    } catch (err) {
      setRouteErrors(true)
    }
  }

  async function fetchBoard () {
    const data = await window.fetch('http://localhost:8000', {
      method: 'GET',
      credencials: 'include',
      headers: {
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    const jsonData = await data.json()
    setBoards(jsonData)
  }

  async function fetchUser () {
    try {
      const resp = await window.fetch('http://localhost:8000/user', {
        method: 'GET',
        credencials: 'include',
        headers: {
          'x-auth-token': getCookie('x-auth-token')
        }
      })
      const jsonResp = await resp.json()
      setUser(jsonResp)
      setLogout(false)
      return jsonResp
    } catch (err) {
      setLogout(true)
      return ''
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

  function getCookie (cookieName) {
    const name = cookieName + '='
    const cookies = document.cookie.split(';')
    for (let index = 0; index < cookies.length; index++) {
      const cookie = cookies[index].trim()
      if (cookie.startsWith(name)) {
        return cookie.slice(name.length, cookie.length)
      }
    }
    return ''
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

  // function dragStartList (event, listId) {
  //   const target = event.target
  //   event.dataTransfer.setData('listId', listId)
  //   setTimeout(() => {
  //     target.style.display = 'none'
  //   }, 0)
  // }

  // function dragEndList (event) {}

  // function dragOverList (event) {}

  // async function dropList (event) {}

  function dragStartCard (event, cardId, cardName, listId) {
    const target = event.target
    event.dataTransfer.setData('cardId', cardId)
    event.dataTransfer.setData('cardName', cardName)
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

  async function dropCard (event, listId) {
    const boardId = props.match.params.boardId
    const target = event.target
    target.style = 'margin-top:10px'
    let cardIndex = 0

    const box = target.getBoundingClientRect()
    const offset = event.clientY - box.top - box.height / 2
    const cardId = event.dataTransfer.getData('cardId')
    // const cardName = event.dataTransfer.getData('cardName')
    const prevListId = event.dataTransfer.getData('prevListId')
    let moveCard
    lists.forEach(list => {
      if (list._id === prevListId) {
        moveCard = list.cards.filter(card => card._id === cardId)[0]
      }
    })

    await deleteCard(boardId, prevListId, cardId)

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
      }
      return list
    })
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
    if (name === 'boardName') setBoardName(value)
    setBoard({ ...board, [name]: value })
    // setBoard(...board, (name = value))
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
    // const boardId = props.match.params.boardId
    await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
    const newLists = lists.filter(list => {
      if (list._id === listId) {
        list.cards = list.cards.filter(card => card._id !== cardId)
      }
      return list
    })
    setLists(newLists)
  }

  function displayCardFunction (e, card, list) {
    setCardDetailToggle(true)
    setCard(card)
    setCardList(list)
  }

  function cardEditFunction (e, card, list) {
    e.stopPropagation()
    const position = e.target.parentNode.getBoundingClientRect()
    setCard(card)
    setCardList(list)
    setCardEditToggle(true)
    setCardPosition(position)
  }

  function exitCardEdit (event) {
    event.stopPropagation()
    setCardEditToggle(false)
  }

  function updateNExitCardEdit (event, cardName, listId, cardId) {
    event.stopPropagation()
    updateCard('cardName', cardName, listId, cardId)
    setCardEditToggle(false)
  }

  function exitCardDetails (event) {
    event.stopPropagation()
    setCardDetailToggle(false)
  }

  function openListActions (e, list) {
    setList(list)
    setListActionToggle(true)
    const box = e.target.getBoundingClientRect()
    setListPosition(box)
    setToBoard(boards.filter(board => board._id === props.match.params.boardId))
  }

  function closeListActions () {
    setListActionToggle(false)
  }

  function openMoveList () {
    setListMoveToggle(true)
    setListActionToggle(false)
  }

  function closeMoveList () {
    setListMoveToggle(false)
  }

  async function changeToBoard (boardName) {
    await setToBoard(boards.filter(board => board.boardName === boardName))
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

    await deleteCard(fromBoardId, fromListId, cardId)
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
    // const listId = list._id
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

  function showMenu () {
    setShowMenuToggle(true)
  }
  function closeShowMenu () {
    setShowMenuToggle(false)
  }
  function showAboutBoard () {
    setShowAboutBoardToggle(true)
  }

  function closeAboutBoard () {
    setShowAboutBoardToggle(false)
  }

  function closeAboutAndShowMenu () {
    closeAboutBoard()
    closeShowMenu()
  }

  function showMembers (event) {
    const box = event.target.getBoundingClientRect()
    setTeamViewPosition(box)
    setShowMembersToggle(!showMembersToggle)
  }
  function closeShowMembers () {
    setShowMembersToggle(false)
  }

  function openMoveCard (event) {
    const position = event.target.getBoundingClientRect()
    setMoveCardPosition(position)
    setInBoard(boards.filter(board => board._id === props.match.params.boardId))
    setInList([cardList])
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
      <Navbar />
      {renderRedirect()}
      <div className='listNavbar'>
        <input
          defaultValue={boardName}
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
        <p className='showMenu' onClick={() => showMenu()}>
          Show menu...
        </p>
      </div>
      <div
        className='listsContainer'
        // onDragOver={e => dragOverList(e)}
        // onDrop={e => {
        //   dropList(e, props.list._id)
        // }}
      >
        {lists.map(list => (
          <List
            displayCardFunction={displayCardFunction}
            cardEditFunction={cardEditFunction}
            exitCardDetails={exitCardDetails}
            cardDetailToggle={cardDetailToggle}
            key={list._id}
            list={list}
            dragOverCard={dragOverCard}
            dropCard={dropCard}
            dragStartCard={dragStartCard}
            dragEndCard={dragEndCard}
            // dragStartList={dragStartList}
            // dragEndList={dragEndList}
            updateListName={updateListName}
            createCard={createCard}
            openListActions={openListActions}
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
          list={cardList}
          boards={boards}
          boardName={boardName}
          openMoveCard={openMoveCard}
          closeMoveCard={closeMoveCard}
          boardId={props.match.params.boardId}
          detailShow={cardDetailToggle}
          exitCardDetails={exitCardDetails}
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
          list={cardList}
          openMoveCard={openMoveCard}
          closeMoveCard={closeMoveCard}
          updateNExitCardEdit={updateNExitCardEdit}
          exitCardEdit={exitCardEdit}
          cardPosition={cardPosition}
          deleteCard={deleteCard}
        />
      )}
      {listActionToggle && (
        <ListActions
          listActionShow={listActionToggle}
          listPosition={listPosition}
          closeListActions={closeListActions}
          deleteList={deleteList}
          openMoveList={openMoveList}
        />
      )}
      {listMoveToggle && (
        <MoveList
          listPosition={listPosition}
          listMoveShow={listMoveToggle}
          boards={boards}
          boardId={props.match.params.boardId}
          boardName={boardName}
          list={list}
          lists={lists}
          closeMoveList={closeMoveList}
          toBoard={toBoard}
          changeToBoard={changeToBoard}
          onMoveList={handleMoveList}
        />
      )}
      {/* {listCopyToggle && <CopyList />} */}
      {showMenuToggle && (
        <ShowMenuComponent
          showMenuToggle={showMenuToggle}
          closeShowMenu={closeShowMenu}
          deleteBoard={deleteBoard}
          showAboutBoard={showAboutBoard}
          user={user}
          board={board}
          leaveBoard={leaveBoard}
        />
      )}
      {showAboutBoardToggle && (
        <AboutBoard
          board={board}
          user={user}
          closeAboutAndShowMenu={closeAboutAndShowMenu}
          showAboutBoardToggle={showAboutBoardToggle}
          closeAboutBoard={closeAboutBoard}
          updateBoard={updateBoard}
        />
      )}
      {showUsersToTeamToggle && (
        <InviteToBoard
          users={users}
          usersPosition={usersPosition}
          closeInviteToBoard={closeInviteToBoard}
          addTeamMember={addTeamMember}
          // userName={userName}
          team={board.team}
        />
      )}
      {showMembersToggle && (
        <ShowMembers
          users={users}
          teamPosition={teamViewPosition}
          team={board.team}
          closeShowMembers={closeShowMembers}
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
          list={cardList}
          boards={boards}
          boardName={boardName}
          boardId={props.match.params.boardId}
          inList={inList}
          changeInList={changeInList}
          inBoard={inBoard}
          changeInBoard={changeInBoard}
          onMoveCard={handleMoveCard}
        />
      )}
    </div>
  )
}
