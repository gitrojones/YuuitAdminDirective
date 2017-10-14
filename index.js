let styleJoin = (styleArr) => styleArr.join('; ').split(',').join(': ')
let getUnique = (el) => el.tagName + '_' + el.className + '_' + el.children.length

let createButtons = (buttons) => {
  let controls = document.createElement('div')
  let cStyle = [
    ['display', 'flex'],
    ['flex', '1'],
    ['max-width', '300px'],
    ['margin-left', 'auto']
  ]

  controls.setAttribute('style', styleJoin(cStyle))

  for (var key in buttons) {
    let button = buttons[key]
    let b = document.createElement('a')
    let bStyle = [
      ['display', 'inline-block'],
      ['height', '100%'],
      ['flex', '1']
    ]
    let type = ['btn-block']

    if (button.style) bStyle.concat(button.style)
    if (button.class) type.push(button.class)
    if (button.html) b.innerHTML = button.html

    b.setAttribute('style', styleJoin(bStyle))
    b.setAttribute('class', type)

    b.addEventListener('click', button.event)

    controls.appendChild(b)
  }

  return controls
}

let createBar = (pos, children, titleText = 'Admin') => {
  let height = '25px'
  let offset = pos === 'top' ? 'calc(0% - 25px)'
    : pos === 'bottom' ? '100%' : undefined
  let style = [
    ['display', 'flex'],
    ['position', 'absolute'],
    ['width', '100%'],
    ['top', offset],
    ['height', height],
    ['line-height', height],
    ['text-align', 'center'],
    ['color', 'white'],
    ['background-color', '#3a754e']
  ]

  let t = document.createElement('div')
  t.setAttribute('class', ['admin-bar', pos])
  t.setAttribute('style', styleJoin(style))

  let title = document.createElement('p')
  title.setAttribute('class', 'admin-title')
  title.setAttribute('style', 'flex: 2;')
  title.innerHTML = titleText

  t.appendChild(title)
  t.appendChild(children)

  return t
}

export default {
  bind (el, {value, arg, modifiers}, {context}) {
    if (arg !== 'top' && arg !== 'bottom') return
    if (typeof value !== 'object') return

    let nodeKey = getUnique(el)
    let {create, update, destroy} = value
    let data = {
      'create': {
        event: create,
        icon: 'mdi-plus-circle',
        color: 'green'
      },
      'update': {
        event: update,
        icon: 'mdi-pencil-circle',
        color: 'yellow'
      },
      'destroy': {
        event: destroy,
        icon: 'mdi-delete-circle',
        color: 'red'
      }
    }

    let buttonData = {}
    for (let key in data) {
      let obj = data[key]

      if (typeof obj.event === 'function') {
        buttonData[key] = {
          event: () => obj.event(el),
          html: `<i class="mdi ${obj.icon}"></i>`,
          style: `color: ${obj.color}`,
          class: `admin-${key}`
        }
      }
    }

    let buttons = createButtons(buttonData)
    let adminBar = createBar(arg, buttons, nodeKey)

    let cStyle = [
      ['position', 'relative'],
      ['height', '100%'],
      ['width', 'auto'],
      ['margin-' + arg, '25px']
    ]

    let container = document.createElement('div')
    container.setAttribute('class', 'admin-container')
    container.setAttribute('style', styleJoin(cStyle))
    container.appendChild(adminBar)

    context[nodeKey] = {
      container: container,
      parent: undefined
    }
  },
  inserted (el, {value}, vnode, oldvnode) {
    if (value['isAuth'] === undefined || value['isAuth'] === false) return
    let nodeKey = getUnique(el)
    let modifiedContainer = vnode.context[nodeKey].container
    vnode.context[nodeKey].parent = el.parentNode

    modifiedContainer.appendChild(el)
    vnode.context[nodeKey].parent.appendChild(modifiedContainer)
  },
  update (el, {value}, vnode, oldvnode) {
    let nodeKey = getUnique(el)
    let modifiedContainer = vnode.context[nodeKey].container

    if (value['isAuth'] === undefined || value['isAuth'] === false) {
      if (el.parentNode.className === 'admin-container') {
        vnode.context[nodeKey].parent.removeChild(modifiedContainer)
        return vnode.context[nodeKey].parent.appendChild(el)
      }
    }

    if (vnode.context[nodeKey].parent === undefined &&
        el.parentNode.className !== 'admin-container') {
      vnode.context[nodeKey].parent = el.parentNode
    }

    modifiedContainer.appendChild(el)
    vnode.context[nodeKey].parent.appendChild(modifiedContainer)
  }
}
