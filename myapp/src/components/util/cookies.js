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

const setCookie = (name, value) => {
  const d = new Date()
  d.setTime(d.getTime() + 60 * 60 * 1000)
  const expires = 'expires=' + d.toUTCString()
  document.cookie = name + '=' + value + ';' + expires + ';path=/'
}

export { getCookie, setCookie }
