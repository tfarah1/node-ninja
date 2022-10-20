const mongoose = require('mongoose');

// create a new Schema
const Schema = mongoose.Schema;

// blog schema (structure)
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  // auto-generate timestamps for creating, updating..
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

// export Blog
module.exports = Blog;
