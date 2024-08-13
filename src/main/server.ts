import { PgHelper } from "../infra/db/postgres/helpers/pg-helper";
import app from "./config/app";
import env from "./config/env";

PgHelper.connect().then(() => {
  app.listen(env.PORT, () => {
    console.log(`App is running in port ${env.PORT}`)
  })
})