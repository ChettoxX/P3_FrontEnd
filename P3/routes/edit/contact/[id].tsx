import { Handlers, PageProps } from "$fresh/server.ts";
import { useEffect, useState } from "preact/hooks";
import EditContactForm from "../../../islands/contact-edit-form.tsx";

export const handler: Handlers = {
  async GET(request, _ctx) {
    try {
      const id = _ctx.params.id;
      const response = await fetch(`http://localhost:8000/api/contact?id=${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch contact with id ${id}`);
      }

      const data = await response.json();
      return _ctx.render(data);
    } catch (error) {
      console.error("Failed to fetch contact:", error);
      return _ctx.render({ error: "Failed to load contact data." });
    }
  },
};

export default function EditContact({ data }: PageProps) {
  return (
    <div>
      <h1>Edit Contact</h1>
      {data ? (
        data.error ? <p>Error loading contact data.</p> : <EditContactForm {...data} />
      ) : (
        <p>Contact data not found.</p>
      )}
    </div>
  );
}
