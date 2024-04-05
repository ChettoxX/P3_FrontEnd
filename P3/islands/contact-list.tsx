import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
};

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setfilter] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchContacts() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();
      setContacts(data);
      setfilter(data)
    } catch (e) {
      console.error(e);
      setError(e);
    }
    setIsLoading(false);
  }

  async function deleteContact(id: string) {
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });
      if (response.status===200) {
        fetchContacts();
        alert("Contact deleted successfully");
        return
      }else{
        alert("ERROR on deleted ");
      }
    } catch (e) {
      console.error(e);
      setError(e);
    }
  }

  function searchContact(query: string) {
    const filteredContacts = contacts.filter((contact) => {
      console.log
      (contact.first_name.toLowerCase().includes(query.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase()))
      return (
        contact.first_name.toLowerCase().includes(query.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase())
      );
    });
    setfilter(filteredContacts);
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <input
        type="text"
        placeholder="Search"
        class={"w-full"}
        onChange={(e) => searchContact(e.currentTarget.value)}
        onBlur={(e) => searchContact(e.currentTarget.value)}
      />
      <div
        style={{
          padding: "0",
        }}
      >
        {filter.map((contact) => (
          <div key={contact.id} class={"contact w-full"}>
            <div class="flex flex-row space items-center">
              <div class="circle" />
              <div class="flex flex-col">
                <div>{contact.first_name} {contact.last_name}</div>
                <div>{contact.email}</div>
              </div>
            </div>
            <div>
              <a href={`/edit/contact/${contact.id}`}>
                <button>Edit</button>
              </a>
              <a href={`/message/${contact.id}`}>
                <button>Message</button>
              </a>
              <button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() =>{
                  deleteContact(contact.id)}}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
