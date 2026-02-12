
export async function GET(request) {
	return new Response(JSON.stringify({ error: 'Endpoint deprecated. Use Clerk directly.' }), {
		status: 410,
		headers: { 'Content-Type': 'application/json' }
	});
}
