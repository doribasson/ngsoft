const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    comments: [
      {
        text: {
          type: String,
          require: true,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
