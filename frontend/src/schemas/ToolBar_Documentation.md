
# ToolBar Component Documentation

## Overview
The `ToolBar.vue` component dynamically renders a customizable toolbar using a schema array. Each schema item defines a toolbar element, such as a button or dropdown.

## Features
- **Buttons** and **Dropdown menus**
- Customizable **icons**, **colors**, and **maxWidth**
- Supports **navigation**, **emitting events**, and **custom callbacks**
- Responsive design
- Dropdowns close on outside click

---

## Schema Options
Each item in the schema array can have the following options:

### Common Options
| Option      | Type       | Description                                                  |
|-------------|------------|--------------------------------------------------------------|
| `type`      | String     | `'button'` or `'dropdown'`                                   |
| `label`     | String     | Button or dropdown label                                     |
| `icon`      | String     | Optional icon class                                          |
| `color`     | String     | CSS variable (e.g., `--color-text-error`) or fallback              |
| `maxWidth`  | String     | Max width (e.g., `'150px'`, `'12rem'`)                      |
| `class`     | String     | Additional CSS class                                         |

### For Buttons
| Option      | Description                                                   |
|-------------|---------------------------------------------------------------|
| `action`    | An object that defines the button action                      |

### For Dropdowns
| Option      | Description                                                   |
|-------------|---------------------------------------------------------------|
| `options`   | An array of items with `label` and `action`                  |

---

## Action Types
Each `action` object supports one of the following:

### Navigate
```js
{ type: 'navigate', to: '/some-page' }
```
Or:
```js
{ type: 'navigate', to: (ctx) => `/edit/${ctx.id}` }
```

### Emit
```js
{ type: 'emit', event: 'delete-item' }
```

### Callback
```js
{ type: 'callback', fn: (ctx) => console.log('Clicked!', ctx) }
```

---

## Example Toolbar Schema
```js
export default [
  {
    type: 'button',
    label: 'Edit',
    icon: 'icon-edit',
    color: '--color-blue',
    maxWidth: '140px',
    action: { type: 'navigate', to: (ctx) => `/modify-person/${ctx.id}` }
  },
  {
    type: 'button',
    label: 'Delete',
    color: '--color-text-error',
    maxWidth: '140px',
    action: { type: 'emit', event: 'delete-person' }
  },
  {
    type: 'dropdown',
    label: 'More',
    icon: 'icon-more',
    color: '--color-grey',
    maxWidth: '160px',
    options: [
      { label: 'Archive', action: { type: 'emit', event: 'archive-person' } },
      { label: 'Duplicate', action: { type: 'callback', fn: (ctx) => duplicatePerson(ctx) } }
    ]
  }
]
```

---

## Notes
- CSS variables like `--color-text-error` should be defined in your `assets/index.css`
- Buttons default to `--color-primary` if no color is provided
- All `to`, `event`, and `fn` functions receive the `context` object passed to `ToolBar.vue`

---

Let me know if you want to extend support for loading states, disabled buttons, or tooltips.
