async function removeTeamMemberFunction (
  event,
  boardId,
  user,
  getCookie,
  updateBoardState,
  updateBoardDeletedState
) {
  const teamMemberId = event.target.parentNode.id
  const data = await window.fetch(`team/${boardId}`, {
    method: 'PUT',
    body: JSON.stringify({ teamMemberId: teamMemberId }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })
  const jsonData = await data.json()
  updateBoardState('team', jsonData.team)
  if (teamMemberId === user._id) {
    updateBoardDeletedState()
  }
}

async function addTeamMemberFunction (
  event,
  boardId,
  getCookie,
  updateBoardState
) {
  const teamMemberId = event.target.id
  const data = await window.fetch(`team/${boardId}`, {
    method: 'POST',
    body: JSON.stringify({ teamMemberId: teamMemberId }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })

  const jsonData = await data.json()
  updateBoardState('team', jsonData.team)
}

export { removeTeamMemberFunction, addTeamMemberFunction }
