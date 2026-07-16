import { Schema, model, models } from "mongoose";

const WatchlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movieId: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    posterPath: {
      type: String,
      required: true,
    },

    voteAverage: {
      type: Number,
      required: true,
    },

    releaseDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Watchlist =
  models.Watchlist || model("Watchlist", WatchlistSchema);

export default Watchlist;