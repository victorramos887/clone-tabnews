import { Client } from "pg";

async function query(queryObject) {

  console.log("ENVIROMENT:", process.env.NODE_ENV)
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === 'development' ? false : true,
  });


  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    console.log(`Este erro deve ser tratado no seu banco de dados: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
