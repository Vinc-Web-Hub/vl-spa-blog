# ToolBar.vue — Documentation & Configuration Guide

The `ToolBar.vue` component renders a flexible and responsive toolbar with support for buttons, dropdowns, icons, and contextual actions. You define its behavior using a schema array.

---

## 🔧 Schema Format

Each item in the schema is an object with:

### Common Fields:
| Property     | Type       | Required | Description                                |
|--------------|------------|----------|--------------------------------------------|
| `type`       | `string`   | ✅       | Must be `'button'` or `'dropdown'`         |
| `label`      | `string`   | ✅       | Text to show on the button/dropdown        |
| `icon`       | `string`   | ❌       | Optional icon class (e.g. FontAwesome)     |
| `class`      | `string`   | ❌       | Optional additional CSS class              |

---

### 📦 Button Item
```js
{
  type: 'button',
  label: 'Edit',
  icon: 'fa fa-edit',
  action: {
    type: 'navigate',
    to: (ctx) => `/modify-person/${ctx.id}`
  }
}
```

### 📦 Dropdown Item
```js
{
  type: 'dropdown',
  label: 'Actions',
  icon: 'fa fa-cogs',
  options: [
    {
      label: 'Edit',
      action: { type: 'navigate', to: (ctx) => `/edit/${ctx.id}` }
    },
    {
      label: 'Delete',
      action: { type: 'emit', event: 'delete-person' }
    }
  ]
}
```

---

## ⚙️ Supported `action.type`

| Type        | Description                                               |
|-------------|-----------------------------------------------------------|
| `navigate`  | Navigate using Vue Router. Supports function or string.   |
| `emit`      | Emits a custom event (e.g. `delete-person`)               |
| `callback`  | Calls a JavaScript function (defined in schema)           |

---

## 📥 Props

| Prop      | Type    | Required | Description                                |
|-----------|---------|----------|--------------------------------------------|
| `schema`  | Array   | ✅       | Array of toolbar item definitions          |
| `context` | Object  | ❌       | Data passed to actions like `ctx.id`       |

---

## 🖼️ Example toolbar.js
```js
export default [
  {
    type: 'button',
    label: 'Edit',
    action: {
      type: 'navigate',
      to: (ctx) => `/modify-person/${ctx.id}`
    }
  },
  {
    type: 'button',
    label: 'Delete',
    action: {
      type: 'emit',
      event: 'delete-person'
    }
  },
  {
    type: 'dropdown',
    label: 'More',
    icon: 'fa fa-ellipsis-h',
    options: [
      {
        label: 'Info',
        action: { type: 'emit', event: 'show-info' }
      }
    ]
  }
]
```

---

## 🎨 Styling Features
- Grey toolbar background with padding and rounded corners
- Even button sizing, spacing, hover styling
- Responsive layout (stacked on small screens)
- Dropdown auto-closes when clicking outside

---

## 📌 Notes
- The component listens globally for clicks to auto-close dropdowns
- Icons use `item.icon` (e.g. FontAwesome class name)
- `context` is automatically passed to actions for dynamic routing or data binding

---

For advanced integrations (e.g. permissions, localization, tooltips), extend the schema logic accordingly.