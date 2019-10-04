import * as mongoose from 'mongoose';
import SpotSchema from '../schemas/SpotSchema';

class SpotRepository {
    private model;

    constructor() {
        this.model = mongoose.model('', SpotSchema);
    }

    getAll() {
        return this.model.find({});
    }

    getById(_id) {
        return this.model.findById(_id);
    }

    async create(spot) {
        return this.model.create(spot)
    }

    update(_id, spot) {
        const updateUser = (<any>Object).assign({}, spot);
        return this.model.findByIdAndUpdate(_id, updateUser, { new: true });
    }

    delete(_id) {
        return this.model.findByIdAndRemove(_id);
    }

}


export default new SpotRepository;
