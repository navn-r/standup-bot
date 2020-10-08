const { Schema, model } = require("mongoose");

/**
 * Schema for standup
 *
 * @property {String}   _id         id of the guild
 * @property {String}   channelId   id of the text-channel 'daily-standups'
 * @property {String}   roleId      id of the role 'Standupper'
 * @property {String}   standupTime time of the standup (24hr)
 * @property {Map}      responses   Map<UserId, String> of responses
 */
const standupSchema = new Schema({
  _id: String,
  channelId: String,
  roleId: String,
  standupTime: {
    type: String,
    default: "11:00:00",
  },
  responses: {
    type: Map,
    of: String,
  },
});

module.exports = model("Standup", standupSchema);
