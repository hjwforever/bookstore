import Cookies from 'js-cookie'

const BSKey = 'bookstore_key'
const session = 'JSESSIONID'

export function getEmail() {
  return Cookies.get(BSKey)
}

export function setEmail(key) {
  return Cookies.set(BSKey, key)
}

export function removeEmail() {
  return Cookies.remove(BSKey)
}

export function getJSessionID() {
  return Cookies.get(session)
}

export function setJSessionID(key) {
  return Cookies.set(session, key)
}

export function removeJSessionID() {
  return Cookies.remove(session)
}

export function resetState() {
  const _removeEmail = removeEmail()
  const _removeJSessionID = removeJSessionID()
  return {
    _removeEmail,
    _removeJSessionID
  }
}
