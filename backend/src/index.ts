import { Hono } from 'hono';

// Create the main Hono app
const app = new Hono();

app.post('/api/v1/signup', (c) => {
	return c.text('signup route')
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

app.put('/api/v1/blog/blog', (c) => {
	return c.text('display all blogs')
})

export default app;

//aiven string
//postgres://avnadmin:AVNS_mxnpkZ3lNpRramIV9oV@postgres-test-db-zmasarath-3f78.a.aivencloud.com:20489/defaultdb?sslmode=require

//connection pool URL
//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMzI5OTU1OWEtMmRjYi00YzRhLTgwN2EtNjRkMzQ2NzgxY2Q0IiwidGVuYW50X2lkIjoiYzg4NGRmMzNjOGVlMzE3NWNhYzgxMjZmMDIyOTI5ZWJkM2MyNjVkZTgzMWE5ZjM4NDljZWViN2Y1ZDY5ODI2MCIsImludGVybmFsX3NlY3JldCI6IjdjMWRhMTVkLTg0OTAtNDgwOC1iODY3LThjNDhhNzk1MTc5YiJ9.SQMa92sef4vPHKcPsbko0leSJyCnhYvDw4z3S65UcIE"