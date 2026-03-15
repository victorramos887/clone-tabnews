import database from "infra/database.js";

async function status(request, response) {

  const updateAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;")
  const queryMaxConnection = await database.query("SHOW max_connections;")

  const databaseName = process.env.POSTGRES_DB;

  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const queryDatabaseStatusResult = await database.query({
      text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname=$1;",
      values: [databaseName]
    }
  )

  response
    .status(200)
    .json({
      "update_at": updateAt,
      "dependencies": {
        "database": {
          "conexoes_maximas": parseInt(queryMaxConnection.rows[0]['max_connections']),
          "version": databaseVersionValue,
          "conexoes_usadas": queryDatabaseStatusResult.rows[0].count
        }
      }
    });
}

export default status;
