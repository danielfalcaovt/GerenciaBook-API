import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helper";
import app from "./config/app";
import env from "./config/env";

MongoHelper.connect(env.MONGO_URL).then(() => {
  app.listen(env.PORT, () => {
    console.log(`App is running in port ${env.PORT}`)
  })
})