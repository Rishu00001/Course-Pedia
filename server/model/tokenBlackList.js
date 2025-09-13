import mongoose from "mongoose";

const TokenBlackListSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const TokenBlackList = mongoose.model("TokenBlackList", TokenBlackListSchema);

export default TokenBlackList;
