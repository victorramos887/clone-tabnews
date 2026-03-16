test.only("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);


  const responseBody = await response.json();


  const parseUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parseUpdateAt)

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toBe("16.0");
  expect(responseBody.dependencies.database.conexoes_maximas).toEqual(100);
  expect(responseBody.dependencies.database.conexoes_usadas).toEqual(1);

});

test("Teste SQL Injection", async () => {
  // const response = await fetch("http://localhost:3000/api/v1/status?databaseName=local_db");
  const response = await fetch("http://localhost:3000/api/v1/status?databaseName=';SELECT pg_sleep(4);--");
});
