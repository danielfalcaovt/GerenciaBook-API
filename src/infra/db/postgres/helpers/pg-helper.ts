/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, QueryResult } from 'pg'
import env from '../../../../main/config/env'

export const PgHelper = {
    client: null as unknown as Pool,
    async connect(): Promise<void> {
        this.client = new Pool({
            host: env.PG_HOST,
            user: env.PG_USER,
            database: env.PG_DATABASE,
            port: env.PG_PORT,
            password: env.PG_PASSWORD

        })
        await this.client.connect()
    },
    async disconnect() {
        await this.client.end()
    },
    async query(queryString: string, queryValues?: any[]): Promise<QueryResult<any>> {
        const result = await this.client.query(queryString, queryValues)
        return result
    }
}