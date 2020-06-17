
import { MongoError } from "mongodb";
import * as mongoose from "mongoose";
import * as env from "../utils/environment";

export function init() {
    const conf: env.Config = env.getConfig(process.env);

    mongoose.set("useUnifiedTopology", true);
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useCreateIndex", true);
    mongoose.connect(conf.mongoDb, {}, function (err: MongoError) {
        if (err) {
            console.error("No se pudo conectar a MongoDB!");
            console.error(err.message);
            process.exit();
        } else {
            console.log("MongoDB conectado.");
        }
    });
}
