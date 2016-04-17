var mongoose = require('mongoose');

var   Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var preguntasSchema = new Schema({
   id_Obj:ObjectId,
   id:Number,
   A : String,
   B : String,
   Interno:Number,
   Externo: Number
});

module.exports = mongoose.model('preguntas', preguntasSchema);