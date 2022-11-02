const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const Songs = mongoose.model("songs");

const SongType = new GraphQLObjectType({
  name: "Songs",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    my_songs: {
      type: new GraphQLList(SongType),
      resolve(parentValue) {
        return Songs.findSongs(parentValue.id);
      },
    },
  }),
});

module.exports = SongType;
