async function removeTeamMemberFunction (
  event,
  boardId,
  user,
  getCookie,
  updateBoardState,
  updateBoardDeletedState
) {
  const teamMemberId = event.target.parentNode.id
  const data = await window.fetch(`http://localhost:8000/team/${boardId}`, {
    method: 'PUT',
    body: JSON.stringify({ teamMemberId: teamMemberId }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })
  const jsonData = await data.json()
  //   setBoard(jsonData)
  updateBoardState('team', jsonData.team)
  if (teamMemberId === user._id) {
    updateBoardDeletedState()
    // setBoardDeleted(true)
  }
}

async function addTeamMemberFunction (
  event,
  boardId,
  getCookie,
  updateBoardState
) {
  const teamMemberId = event.target.id
  const data = await window.fetch(`http://localhost:8000/team/${boardId}`, {
    method: 'POST',
    body: JSON.stringify({ teamMemberId: teamMemberId }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })

  const jsonData = await data.json()
  updateBoardState('team', jsonData.team)
  //   setBoard(jsonData)
}

module.exports = { removeTeamMemberFunction, addTeamMemberFunction }
