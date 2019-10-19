import * as mongoose from 'mongoose';
import SpotSchema from '../schemas/SpotSchema';

class DashboardRepository {
    private model;

    constructor() {
        this.model = mongoose.model('Spot', SpotSchema);
    }

    async show(user: object) {

        const { user_id } = user;

        const response = await this.model.find({ user: user_id });

        return response;
    }
}


export default new DashboardRepository;
