const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrgSchema = new Schema({
    name: String,
    contact: {
        email: String,
        phoneNum: String,
        fbLink: String
    },
    category: [String],
    description: String,
    img: String,
    recruit: {
        jobDes: String,
        deadline: Date,
        formLink: String
    }
});

module.exports = mongoose.model('Org', OrgSchema)