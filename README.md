### A quick note on how I built this

My background is in Solutions Engineering and Product, which means I spend a lot of time prototyping, debugging integrations, and helping customers get things working.

For this demo, I approached it the same way I would in a real SE role:

- I got hands-on with the Stream SDKs  
- I built a working concept quickly  
- I used AI to speed up the boilerplate/UI stuff  
- And I focused on understanding how the pieces fit together  
  (Video client → Call → Chat client → Channel → Tokens → UI)

It’s a “vibe coded” demo, not a production app — the goal was just to show how I think, how I learn a new product, and how I’d prototype something for a customer in an actual presales situation.


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
