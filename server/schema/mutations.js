const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Songs = mongoose.model("songs");

const MySongsType = require("./songs_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSong: {
      type: MySongsType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(parentValue, { title }) {
        return new Songs({ title }).save();
      },
    },

    likes: {
      type: MySongsType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Songs.like(id);
      },
    },
    deleteSong: {
      type: MySongsType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Songs.findOneAndRemove(id);
      },
    },
  },
});

module.exports = mutation;
