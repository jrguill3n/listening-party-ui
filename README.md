# Stream Listening Party Demo

Small demo I built while interviewing for a Solutions Engineer role at Stream.

It’s a **Listening Party** experience that combines:

- **Stream Video SDK** – host on camera using `SpeakerLayout`
- **Stream Chat** – backchannel chat with message reactions
- **24/7 Synthwave Radio** – background audio using a public HLS stream
- **Custom Vaporwave UI** – Vite + React + TypeScript, fully custom layout

## What it demonstrates

- Creating and joining a Stream Video call from the client
- Wiring a Stream Chat `messaging` channel as a sidecar to the call
- Custom UI around the SDK components (no default controls)
- Simple social interactions via emoji reactions on messages

> **Note:** API key and tokens are hardcoded for demo purposes only.  
> In a real deployment, user tokens would be issued from a secure backend.

## Tech stack

- Vite + React + TypeScript
- `@stream-io/video-react-sdk`
- `stream-chat` + `stream-chat-react`
- Basic CSS (no Tailwind)

## Running locally

```bash
npm install
npm run dev
