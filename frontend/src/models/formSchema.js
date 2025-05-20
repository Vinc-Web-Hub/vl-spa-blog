// formSchema.js
export const formSchema = {
  "field-1": { type: "string", required: false },
  "field-2": { type: "string", required: true },
  "field-3": {
    type: "enum",
    values: ["admin", "editor", "viewer"],
    default: "viewer",
  },
  "field-4": { type: "textarea", rows: 5, required: false },
  "field-5": { type: "date", required: true },
};
