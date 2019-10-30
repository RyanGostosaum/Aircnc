import * as mongoose from 'mongoose';
import SpotSchema from '../schemas/SpotSchema';
import SessionSchema from '../schemas/SessionSchema';

class SpotRepository {
    private model;
    private session;

    constructor() {
        this.model = mongoose.model('Spot', SpotSchema);
        this.session = mongoose.model('Session', SessionSchema);
    }

    async create(req) {

        console.log('[SPOT CONTROLLER]: creating spot');

        const { price, techs, company } = req.body;
        const { filename } = req.file;
        const { user_id } = req.headers;

        const user = await this.session.findById(user_id);

        if (!user) {
            return 'user not found'
        }

        const spot = await this.model.create({
            user: user_id,
            thumbnail: filename,
            company,
            price,
            techs: techs.split(',').map(tech => tech.trim())
        });

        return spot;
    }

    update(_id, spot) {
        const updateUser = (<any>Object).assign({}, spot);
        return this.model.findByIdAndUpdate(_id, updateUser, { new: true });
    }

    delete(_id) {
        return this.model.findByIdAndRemove(_id);
    }

    async all(query) {
        const { tech } = query

        const spots = await this.model.find({ techs: tech })

        return spots
    }
}


export default new SpotRepository;
