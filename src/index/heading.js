export default () => {
  const element = document.createElement('h2')
  element.textContent = 'Hello00 webpack'
  element.addEventListener('click', () => alert('Hello webpack'))
  return element
}