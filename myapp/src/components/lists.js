import React, { useState, useEffect } from 'react'
import Navbar from './navbar.js'
import List from './list'
import CardDetails from './cardDetails'
import CardEdit from './cardEdit'
import ListActions from './listActions.js'
import MoveList from './moveList'
import PageNotFound from './pageNotFound'
import { Redirect } from 'react-router-dom'
import ShowMenuComponent from './showMenu'
import AboutBoard from './aboutBoard'
// import ShowMenu from './showMenu.js'

export default function Lists (props) {
  const [logout, setLogout] = useState(false)
  const [boards, setBoards] = useState([])
  const [lists, setLists] = useState([])
  const [cardList, setCardList] = useState([])
  const [card, setCard] = useState([])
  const [boardName, setBoardName] = useState([])
  const [list, setList] = useState([])
  const [listActionToggle, setListActionToggle] = useState(false)
  // const [boardNameUpdate, setBoardNameUpdate] = useState(false)
  const [cardDetailToggle, setCardDetailToggle] = useState(false)
  const [cardEditToggle, setCardEditToggle] = useState(false)
  const [cardPosition, setCardPosition] = useState([])
  const [listPosition, setListPosition] = useState([])
  const [routeErrors, setRouteErrors] = useState(false)
  const [showMenuToggle, setShowMenuToggle] = useState(false)
  const [boardDeleted, setBoardDeleted] = useState(false)
  const [listMoveToggle, setListMoveToggle] = useState(false)
  const [toBoard, setToBoard] = useState([])

  useEffect(() => {
    fetchList()
    async function fetchList () {
      try {
        await fetchUser()
        // Write an try catch to handle the non-valid boardId
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
          setLists(jsonData.lists)
        } else {
          throw new Error(data.statusText)
        }
      } catch (err) {
        setRouteErrors(true)
      }
    }
    fetchBoard()
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
  }, [props.match.params.boardId])

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
      // await setUser(jsonResp)
      // console.log(user)
      // console.log(jsonResp)
      setLogout(false)
      return jsonResp
    } catch (err) {
      setLogout(true)
      return ''
    }
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
        body: JSON.stringify({ cardName: cardName }),
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

  function dragStart (event, cardId, cardName, listId) {
    const target = event.target
    event.dataTransfer.setData('cardId', cardId)
    event.dataTransfer.setData('cardName', cardName)
    event.dataTransfer.setData('prevListId', listId)
    event.target.classList.add('dragging')

    setTimeout(() => {
      target.style.display = 'none'
    }, 0)
  }

  function dragEnd (event) {
    event.target.style.display = 'flex'
  }

  function dragOver (event) {
    event.preventDefault()
    const childs = event.target.parentNode.childNodes
    for (const child of Array.from(childs)) {
      child.style = 'margin-top:10px'
    }
    event.target.style = 'margin-top:20px'
  }

  async function createCardAtIndex (
    boardId,
    listId,
    cardId,
    cardName,
    cardIndex
  ) {
    await window.fetch(
      `http://localhost:8000/board/card/${boardId}/${listId}/${cardIndex}`,
      {
        method: 'POST',
        body: JSON.stringify({ _id: cardId, cardName: cardName }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
        }
      }
    )
  }

  async function drop (event, listId) {
    const boardId = props.match.params.boardId
    const target = event.target
    target.style = 'margin-top:10px'
    let cardIndex = 0

    const box = target.getBoundingClientRect()
    const offset = event.clientY - box.top - box.height / 2
    const cardId = event.dataTransfer.getData('cardId')
    const cardName = event.dataTransfer.getData('cardName')
    const prevListId = event.dataTransfer.getData('prevListId')
    const newLists = lists.map(list => {
      if (list._id === prevListId) {
        const newCards = list.cards.filter(card => card._id !== cardId)

        list.cards = newCards
      }
      if (list._id === listId) {
        let index = list.cards.length
        for (let i = 0; i < list.cards.length; i++) {
          if (list.cards[i]._id === event.target.id) {
            if (offset > 0) {
              index = i + 1
            } else {
              index = i
            }
          }
        }
        cardIndex = index
        list.cards.splice(index, 0, {
          _id: cardId,
          cardName: cardName
        })
      }
      return list
    })
    setLists(newLists)
    await deleteCard(boardId, prevListId, cardId)

    await createCardAtIndex(boardId, listId, cardId, cardName, cardIndex)
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
    setBoardName(value)
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
    // console.log(boardName)
    await setToBoard(boards.filter(board => board.boardName === boardName))
    // console.log(toBoard)
  }

  async function handleMoveCard (
    fromBoardId,
    toBoardId,
    fromListId,
    toListId,
    card,
    toIndex
  ) {
    const cardId = card._id
    const cardName = card.cardName
    const newLists = lists.map(list => {
      if (list._id === fromListId) {
        const newCards = list.cards.filter(card => card._id !== cardId)

        list.cards = newCards
      }
      if (list._id === toListId) {
        list.cards.splice(toIndex, 0, {
          _id: cardId,
          cardName: cardName
        })
      }
      return list
    })
    setLists(newLists)
    await deleteCard(fromBoardId, fromListId, cardId)

    await createCardAtIndex(toBoardId, toListId, cardId, cardName, toIndex)
  }
  async function handleMoveList (fromBoardId, toBoardId, list, toIndex) {
    // console.log(fromBoardId, toBoardId, list, toIndex)
    const listId = list._id
    // const cards = list.cards
    const newBoards = boards.map(board => {
      if (board._id === fromBoardId) {
        const newLists = board.lists.filter(list => list._id !== listId)
        board.lists = newLists
      }
      if (board._id === toBoardId) {
        board.lists.splice(toIndex, 0, list)
      }
      return board
    })
    setBoards(newBoards)
    // console.log(boards)
    // console.log(newBoards.slice())
    const board = newBoards.filter(board => {
      // console.log(board)
      return board._id === props.match.params.boardId
    })
    // console.log(board)
    // console.log(lists)
    // console.log(board[0].lists)
    setLists(board[0].lists)
    setListMoveToggle(false)
    // const newList = board.lists.
    // const newLists = boards.lists.filter()
  }

  function showMenu () {
    setShowMenuToggle(true)
  }
  function closeShowMenu () {
    setShowMenuToggle(false)
  }

  function closeAboutAndShowMenu () {
    console.log('working on closing of both')
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
        <textarea
          defaultValue={boardName}
          spellCheck='false'
          className='boardNameInList'
          onBlur={e => {
            return updateBoard('boardName', e.target.value)
          }}
        />
        <p className='showMenu' onClick={() => showMenu()}>
          Show menu...
        </p>
      </div>
      <div className='listsContainer'>
        {lists.map(list => (
          <List
            displayCardFunction={displayCardFunction}
            cardEditFunction={cardEditFunction}
            exitCardDetails={exitCardDetails}
            cardDetailToggle={cardDetailToggle}
            key={list._id}
            list={list}
            dragOver={dragOver}
            drop={drop}
            dragStart={dragStart}
            dragEnd={dragEnd}
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
      <CardDetails
        card={card}
        list={cardList}
        boards={boards}
        boardName={boardName}
        boardId={props.match.params.boardId}
        detailShow={cardDetailToggle}
        exitCardDetails={exitCardDetails}
        updateCard={updateCard}
        deleteCard={deleteCard}
        handleMoveCard={handleMoveCard}
      />
      <CardEdit
        cardEditShow={cardEditToggle}
        boardId={props.match.params.boardId}
        card={card}
        list={cardList}
        updateNExitCardEdit={updateNExitCardEdit}
        exitCardEdit={exitCardEdit}
        cardPosition={cardPosition}
        deleteCard={deleteCard}
      />
      <ListActions
        listActionShow={listActionToggle}
        listPosition={listPosition}
        closeListActions={closeListActions}
        deleteList={deleteList}
        openMoveList={openMoveList}
      />
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
      <ShowMenuComponent
        showMenuToggle={showMenuToggle}
        closeShowMenu={closeShowMenu}
        deleteBoard={deleteBoard}
      />
      <AboutBoard
        showMenu={showMenu}
        closeAboutAndShowMenu={closeAboutAndShowMenu}
      />
    </div>
  )
}
