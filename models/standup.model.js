const { Schema, model } = require("mongoose");

/**
 * Schema for standup
 */
const standupSchema = new Schema({
  serverId: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  standupTime: {
    type: String,
    default: "11:00:00",
    required: true,
  },
  members: [String], // discord ids of the members
  responses: {
    type: Map,
    of: String,
  },
});

/**
 * Checks if all members have posted in the standup
 * @param {function} callback
 */
standupSchema.methods.checkFulfilled = function (callback) {
  const missing = [];

  this.members.forEach((member) => {
    if (!this.responses.get(member)) {
      missing.push(member);
    }
  });
  callback(missing);
};

module.exports = model("Standup", standupSchema);
