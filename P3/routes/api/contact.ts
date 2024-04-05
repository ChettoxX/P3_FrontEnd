import { Handlers } from "$fresh/server.ts";
import { Contact } from "../../islands/contact-list.tsx";

export const handler: Handlers = {
  async GET(request, _ctx) {
    console.log(
      `[GET] | from: ${_ctx.remoteAddr.hostname} | url: ${request.url}`,
    );
    const url = new URL(request.url);

    const data = await Deno.readTextFile("./data/contact.json");

    

    if (url.searchParams.has("id")) {
      const id = url.searchParams.get("id");
      const contacts = JSON.parse(data);
      const contact = contacts.find((c: Contact) => c.id === id);
      return new Response(JSON.stringify(contact), {
        headers: {
          "content-type": "application/json",
        },
      });
    }

    return new Response(data, {
      headers: {
        "content-type": "application/json",
      },
    });
  },

  async POST(request, _ctx) {
    try {
      console.log(
        `[POST] | from: ${_ctx.remoteAddr.hostname} | url: ${request.url}`,
      );
      const contact = await request.json();

      const data = await Deno.readTextFile("./data/contact.json");

      const contacts = JSON.parse(data);

      if (
        !contact.name || !contact.lastName || !contact.email || !contact.gender
      ) {
        return new Response("Invalid data", { status: 200 });
      }

      const newContact = {
        id: crypto.randomUUID(),
        last_name: contact.lastName,
        first_name: contact.name,
        email: contact.email,
        gender: contact.gender,
      };

      if (contacts.find((c: any) => c.email === newContact.email)) {
        return new Response("Contact already exists", { status: 200 });
      }

      contacts.push(newContact);

      await Deno.writeTextFile(
        "./data/contact.json",
        JSON.stringify(contacts, null, 2),
      );

      return new Response("Contact created", { status: 200 });
    } catch (error) {
      return new Response(error, { status: 200 });
    }
  },
  async DELETE(request, _ctx) {
    try {

      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      console.log("id",id);
      

      const data = await Deno.readTextFile("./data/contact.json");

      const contacts = JSON.parse(data);

      const newContacts = contacts.filter((c: Contact) => {
        console.log(c.id==id);
        
        if(c.id===id){
          return false
        }
        return true
      });
      console.log(newContacts);
      
      await Deno.writeTextFile(
        "./data/contact.json",
        JSON.stringify(newContacts),
      );

      return new Response("Contact deleted", { status: 200 });
    } catch (error) {
      return new Response(error, { status: 200 });
    }
  },
  async PUT(request, _ctx) {
    try {
      console.log(
        `[PUT] | from: ${_ctx.remoteAddr.hostname} | url: ${request.url}`,
      );
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      const contact = await request.json();
      const data = await Deno.readTextFile("./data/contact.json");
      const contacts = JSON.parse(data);
      const index = contacts.findIndex((c: any) => c.id === id);

      if (index === -1) {
        return new Response("Contact not found", { status: 200 });
      }

      if (
        !contact.name || !contact.lastName || !contact.email || !contact.gender
      ) {
        return new Response("Invalid data", { status: 200 });
      }

      contacts[index] = {
        id,
        last_name: contact.lastName,
        first_name: contact.name,
        email: contact.email,
        gender: contact.gender,
      };

      await Deno.writeTextFile(
        "./data/contact.json",
        JSON.stringify(contacts, null, 2),
      );

      return new Response("Contact updated", { status: 200 });
    } catch (error) {
      return new Response(error, { status: 200 });
    }
  },
};
