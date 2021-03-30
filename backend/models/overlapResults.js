const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log("connecting to ", url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log("connection built");
    })
    .catch(error => {
        console.log("connection failed with error: ", error.message);
    })

const overlapResultSchema = new mongoose.Schema({
    fundName: {
        type: String,
        required: true,
        unique: true
    },
    overlap: Array,
    expand: Boolean,
    queryMode: String
})
    
overlapResultSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

overlapResultSchema.plugin(uniqueValidator)

module.exports = mongoose.model('overlapResults', overlapResultSchema)