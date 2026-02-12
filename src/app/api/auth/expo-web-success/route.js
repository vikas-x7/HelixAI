
export async function GET(request) {
	return new Response(
		`<html><body><script>window.parent.postMessage({ type: 'AUTH_ERROR', error: 'Endpoint deprecated' }, '*');</script></body></html>`,
		{ headers: { 'Content-Type': 'text/html' } }
	);
}
