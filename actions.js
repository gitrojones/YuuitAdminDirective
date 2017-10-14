export default {
  getUnique (el) { return `${el.tagName}_${el.className}_${el.children.length}` },
  createButtons (buttons) {
    let controls = document.createElement('div')
    controls.setAttribute('class', 'admin-buttons')

    for (var key in buttons) {
      let button = buttons[key]
      let buttonElement = document.createElement('a')
      let type = ['admin-button']

      if (button.class) type.push(button.class)
      if (button.html) buttonElement.innerHTML = button.html

      buttonElement.setAttribute('class', type.join(' '))
      buttonElement.addEventListener('click', button.event)

      controls.appendChild(buttonElement)
    }

    return controls
  },
  createBar (pos, children, titleText = 'Admin', noTitle = false) {
    let t = document.createElement('div')
    t.setAttribute('class', ['admin-bar', pos].join(' '))

    if (!noTitle) {
      let title = document.createElement('p')
      title.setAttribute('class', 'admin-title')
      title.innerHTML = titleText
      t.appendChild(title)
    }

    t.appendChild(children)

    return t
  }
}
