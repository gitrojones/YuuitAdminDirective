import styles from './style.scss' // Default Style Layout
import actions from './actions.js'

export default {
  bind (el, {value, arg, modifiers}, {context}) {
    if (arg !== 'top' && arg !== 'bottom' &&
        arg !== 'left' && arg !== 'right') {
      console.log(`Positional Argument Missing: Defaulting to TOP.`)
      arg = 'top'
    }
    if (typeof value !== 'object') {
      console.log('Expression Required: Expression missing, see Documentation.')
      // return
    }

    console.log(modifiers)

    let nodeKey = actions.getUnique(el)
    let {create, update, destroy} = value
    let data = {
      'create': {
        event: create,
        icon: 'mdi-plus-circle',
        class: 'create'
      },
      'update': {
        event: update,
        icon: 'mdi-pencil-circle',
        class: 'update'
      },
      'destroy': {
        event: destroy,
        icon: 'mdi-delete-circle',
        class: 'destroy'
      }
    }

    let buttonData = {}
    for (let key in data) {
      let obj = data[key]

      if (typeof obj.event === 'function') {
        buttonData[key] = {
          event: () => obj.event(el),
          html: `<i class="mdi ${obj.icon}"></i>`,
          class: `${key}`
        }
      }
    }

    let buttons = actions.createButtons(buttonData)
    let adminBar = actions.createBar(arg, buttons, nodeKey, modifiers['no-title'])

    let container = document.createElement('div')
    container.setAttribute('class', ['admin-container', arg].join(' '))
    container.appendChild(adminBar)

    context[nodeKey] = {
      container: container,
      parent: undefined
    }
  },
  inserted (el, {value}, vnode, oldvnode) {
    if (value['isAuth'] === undefined || value['isAuth'] === false) return
    let nodeKey = actions.getUnique(el)
    let modifiedContainer = vnode.context[nodeKey].container
    vnode.context[nodeKey].parent = el.parentNode

    modifiedContainer.appendChild(el)
    vnode.context[nodeKey].parent.appendChild(modifiedContainer)
  },
  update (el, {value}, vnode, oldvnode) {
    let nodeKey = actions.getUnique(el)
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
