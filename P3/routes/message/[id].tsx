import { PageProps } from "$fresh/server.ts";
import Chat from "../../islands/chat.tsx";

export default function ChatPage(props: PageProps) {
  return (
    <div>
      <Chat id={props.params.id} />
    </div>
  );
}