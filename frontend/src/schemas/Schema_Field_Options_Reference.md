# 🧩 Schema Field Options Reference

This document lists all valid properties for schema fields used in **FormGrid.vue** and **DisplayGrid.vue** components.

---

## ✅ Core Field Properties

| Property        | Type         | Used In              | Description |
|----------------|--------------|----------------------|-------------|
| `type`         | `string`     | Both                 | Field type: `'string'`, `'date'`, `'time'`, `'textarea'`, `'enum'`, `'section'`, etc. (**required**) |
| `label`        | `string`     | DisplayGrid          | User-facing label (defaults to key if not provided) |
| `placeholder`  | `string`     | FormGrid             | Placeholder text in inputs or textareas |
| `required`     | `boolean`    | FormGrid             | Makes the field mandatory |
| `default`      | `any`        | FormGrid             | Default value when initializing form |
| `inputType`    | `string`     | FormGrid             | HTML input type override (e.g. `'password'`, `'email'`) |
| `values`       | `array`      | FormGrid, DisplayGrid| For `'enum'` type, specifies allowed options |
| `readonly`     | `boolean`    | (extendable)         | Prevent editing in FormGrid (if implemented) |

---

## 📅 Date & Time Enhancements

| Property        | Type         | Description |
|----------------|--------------|-------------|
| `useCurrentDate`| `boolean`    | Auto-fill the current date/time as default |
| `min`           | `string`     | Minimum date/time allowed (e.g. `'2023-01-01'`) |
| `max`           | `string`     | Maximum date/time allowed |
| `step`          | `number`     | Time field step (in seconds, e.g. 60 = 1min) |
| `format`        | `function`   | Custom display formatting (DisplayGrid only) |

---

## 📐 Grid Layout Properties

| Property    | Type       | Description |
|-------------|------------|-------------|
| `row`       | `number`   | Row index for placement |
| `col`       | `number`   | Column index for placement |
| `rowSpan`   | `number`   | Number of grid rows the field spans |
| `colSpan`   | `number`   | Number of grid columns the field spans |
| `align`     | `'start'`, `'center'`, `'end'` | Vertical alignment |
| `justify`   | `'start'`, `'center'`, `'end'` | Horizontal alignment |

---

## 🧱 Section Header Support (type: 'section')

Use `type: 'section'` to group fields visually:

```js
addressSection: {
  type: 'section',
  label: 'Address Info',
  row: 4,
  col: 1,
  colSpan: 2
}
```

Add `collapsible: true` and `collapsed: true` if you support collapsing.

---

## 🧠 Advanced / Optional

| Property                   | Type                            | Description |
|----------------------------|---------------------------------|-------------|
| `visible`                  | `boolean` or `(doc) => boolean` | Conditional display based on document values            |
| `tooltip`(not implemented) | `string`                       | Hover message near label |
| `class` (not implemented)  | `string`                       | Custom class for styling override |

---

## ✅ Example Field with Full Options

```js
birthDate: {
  type: 'date',
  label: 'Date of Birth',
  required: true,
  row: 2,
  col: 1,
  placeholder: 'YYYY-MM-DD',
  useCurrentDate: false,
  min: '1900-01-01',
  max: '2100-12-31',
  format: (val) => new Date(val).toLocaleDateString()
}
```