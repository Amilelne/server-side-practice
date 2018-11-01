const { conf } = require('../conf');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    weight: {
      type: Schema.Types.Decimal128,
      required: true
    }
  },
  {
    versionKey: false
  }
);

const record = conf('collections.record');
exports.Record = mongoose.model(record, recordSchema, record);
