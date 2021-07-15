import defaultSettings from '@/settings'

const title = defaultSettings.title || ' 网上书城 '

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
