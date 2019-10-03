
import { resolve } from "path"

import { config } from "dotenv"

config({ path: resolve(__dirname, "../../.env") })

export const appConfig = {
    secret: process.env.JWT_SECRET,
    port: process.env.PORT,
    db: process.env.DB
}