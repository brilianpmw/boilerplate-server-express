let Schema = mongoose.Schema;

let subchild_schema = new Schema({
  parent_id: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  },
});
let child_schema = new Schema({
  parent_id: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  },
  child: [subchild_schema]
});
let category_schema = new Schema({
  name: {
    type: String,
    default: null
  },
  parent_id: {
    type: String,
    default: null
  },
  id: {
    type: Number,
    default: null
  },
  child: [child_schema],
  marketplace: {
    type: Schema.Types.ObjectId,
    ref: "marketplace"
  },

  /* config */
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: null
  },
  is_delete: {
    type: Boolean,
    default: false
  }
});

let category = mongoose.model("category", category_schema);

module.exports = category;
