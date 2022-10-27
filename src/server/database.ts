import { MongoError } from "mongodb";
import * as mongoose from "mongoose";
import * as env from "../utils/environment";

export function init() {
    const conf: env.Config = env.getConfig(process.env);
    mongoose.connect(conf.mongoDb, {
        autoIndex: true
    }, (err: MongoError) => {
        if (err) {
            console.error("No se pudo conectar a MongoDB!");
            console.error(err.message);
            process.exit();
        } else {
            console.log("MongoDB conectado.");
        }
    });
}
