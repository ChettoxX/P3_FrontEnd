import { Handlers } from "$fresh/server.ts";
type Message = {
  id: string;
  idUser: string;
  message: string;
  createdAt: string;
};
export const handler: Handlers = {
  async GET(request, _ctx) {
    console.log(
      `[GET] | from: ${_ctx.remoteAddr.hostname} | url: ${request.url}`,
    );

    const url = new URL(request.url);

    const data = await Deno.readTextFile("./data/message.json");

    if (url.searchParams.has("id")) {
      const id = url.searchParams.get("id");
      const messages = JSON.parse(data) as Message[];
      const filter = messages.filter((m: Message) => m.idUser === id);
      return new Response(JSON.stringify(filter), {
        headers: {
          "content-type": "application/json",
        },
      });
    } else {
      return new Response("No data found", {
        headers: {
          "content-type": "application/json",
        },
      });
    }
  },
  async POST(request, _ctx) {
    console.log(
      `[POST] | from: ${_ctx.remoteAddr.hostname} | url: ${request.url}`,
    );
    const message = await request.json();

    const data = await Deno.readTextFile("./data/message.json");

    const messages = JSON.parse(data);

    if (
      !message.idUser || !message.message
    ) {
      return new Response("Invalid data", { status: 200 });
    }

    const newMessage = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...message,
    };

    messages.push(newMessage);

    await Deno.writeTextFile(
      "./data/message.json",
      JSON.stringify(messages, null, 2),
    );

    return new Response("Message created", { status: 200 });
  },
  async DELETE(request, _ctx) {
    console.log(
      `[DELETE] | from: ${_ctx.remoteAddr.hostname} | url: ${request.url}`,
    );
    


     Deno.writeTextFileSync(
      "./data/message.json",
      JSON.stringify([], null, 2),
    );

    return new Response("Message created", { status: 200 });
  },
};
