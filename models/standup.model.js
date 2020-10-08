const { Schema, model } = require("mongoose");

/**
 * Schema for standup
 *
 * @property {String}   _id         id of the guild
 * @property {String}   channelId   id of the read-only channel 'daily-standups'
 * @property {String}   standupTime time of the standup (24hr)
 * @property {[String]} members     array of userIds for the members of the standup
 * @property {Map}      responses   Map<UserId, String> of responses
 */
const standupSchema = new Schema({
  _id: String,
  channelId: {
    type: String,
    required: true,
  },
  standupTime: {
    type: String,
    default: "11:00:00",
    required: true,
  },
  members: [String],
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
