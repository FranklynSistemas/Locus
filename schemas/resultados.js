var mongoose = require('mongoose');

var   Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var resultadosSchema = new Schema({
   id_Obj:ObjectId,
   id:Number,
   Nombre : String,
   Interno : Number,
   Externo : Number
});

module.exports = mongoose.model('resultados', resultadosSchema);