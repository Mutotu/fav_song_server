const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MySongsSchema = new Schema({
  songs: {
    type: Schema.Types.ObjectId,
    ref: "songs",
  },
  likes: { type: Number, default: 0 },
  content: { type: String },
});

MySongsSchema.statics.like = function (id) {
  const Songs = mongoose.model("songs");

  return Songs.findById(id).then((song) => {
    ++song.likes;
    return song.save();
  });
};

mongoose.model("songs", MySongsSchema);
