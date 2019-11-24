import * as mongoose from 'mongoose';

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
});

SpotSchema.virtual('thumbnail_url').get(function () {
    return `http://192.168.0.106:8080/files/${this.thumbnail}`
})

export default SpotSchema;
