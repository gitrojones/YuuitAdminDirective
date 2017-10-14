# Yuuit Administration Directive 
## (v-admin) V0.01A
### Purpose
A WSIWYG Administration component designed to work generically with any HTML element.

### Requirements
* Vue 2.x+

### How it Works
The administration directive wraps the HTMLNode element with an administration element that binds click events to create, update, and destroy buttons. From there, it is your responsibility to define an action to take on the event being fired.

![topMultiTitle](https://github.com/gitrojones/YuuitAdminDirective/top.multi.title.png)

![leftNoTitle](https://github.com/gitrojones/YuuitAdminDirective/left.no-title.png)

### How to Use
The administration directive requires an expression in order to function. For single components the directive works out of the box without any major modifications. For iterated content rendered using a v-for loop you must append the object index to the class_name of the HTMLNode.

#### Styles
The styles.scss are default styles. You're free to modify as you desire.

### Bindings
The directives expression is required and determines what options are present on the rendered element.

```html
<element>
  <data-element v-admin:left.no-title="admin"></data-element>
</element>
```

Where

```javascript
admin = {
  isAdmin: this.$store.getters.isLoggedIn,
  create: () => { // Some Action },
  update: (el) => { // Some Action },
  destroy: (el) => { // Some Action }
}
```

#### Expression
The administration directive accepts an object expression defining the following keys:

* isAuth ``[Boolean]``
  * Determines if the directive renders. My typical strategy is to check local storage for a session key assigned in a previous instance. If it is present I will send a login request to the login server to check if the session is still valid. If so, I assign True to a variable stored in my Vuex Administration store.

* create ``[Function]``(Optional) 
  * Action describing what to do when the user clicks the (+) icon.

* update ``[Function]``(Optional) 
  * Action describing what to do when the user clicks the (/) - pencil – icon.

* destroy ``[Function]``(Optional) 
  * Action describing what to do when the user clicks the (x) icon.

Missing keys are omitted from the spawned element.

#### Argument
The directive accepts the following arguments:

	:top – Renders the wrapper on the top of the element.
	:left – Renders the wrapper on the left side of the element.
    :right – Renders the wrapper on the right side of the element.
	:bottom – Renders the wrapper on the bottom of the element.

#### Modifiers
The directive accepts the following modifiers:

	.noTitle – Removes the title from the bar.

### Additonal Information
The following directive was designed to be generic. In order to be useful in many different applications. My Administration Editor component is designed to complement this directive in order to build simple and robust administration panels for server-side data.

[See Yuuit Admin Editor](http://github.com/gitrojones/YuuitAdminEditor)
