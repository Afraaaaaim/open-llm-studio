export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma3:1b",
      messages: body.messages,
      stream: false, // 👈 IMPORTANT
    }),
  });

  const data = await response.json();

  return Response.json(data);
}