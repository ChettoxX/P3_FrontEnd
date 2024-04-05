import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="flex flex-col">
      <header class="header">
        <h1 class="text-2xl font-bold">Cool-Agenda</h1>
        <div class="flex justify-end items-center">
          <a href="/" class="text-blue-500">
            <button class="">Home</button>
          </a>
          <a href="/create/contact" class="text-blue-500">
            <button class="">Create Contact</button>
          </a>
        </div>
      </header>
      <main class="p-4">
        <Component />
      </main>
    </div>
  );
}