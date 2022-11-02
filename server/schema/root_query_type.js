const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const MySongsType = require("./songs_type");

const Songs = mongoose.model("songs");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    songs: {
      type: new GraphQLList(MySongsType),
      resolve() {
        return Songs.find({});
      },
    },
    song: {
      type: MySongsType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Songs.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
