import { useState } from "preact/hooks";
import CreateContactForm from "../../islands/contact-create-form.tsx";

export default function CreateContact() {
  return (
    <div>
      <h1>Create Contact</h1>
      <CreateContactForm />
    </div>
  );
}