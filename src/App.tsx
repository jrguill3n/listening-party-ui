import { useEffect, useState, useRef } from "react";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  SpeakerLayout,
  type Call,
} from "@stream-io/video-react-sdk";

import {
  StreamChat as StreamChatClient,
  type Channel as StreamChannel,
} from "stream-chat";

import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  MessageSimple,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import "./App.css";

// 🔧 YOUR CONFIG
const apiKey = "eyyzag64c543";
const callId = "listening-party-87e46c5a-9901-4dcf-a414-fc6f60bfee62";
const channelId = callId;
const userId = "host";

// 🔐 TOKENS FROM PYTHON
const VIDEO_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjM3NTg5MzcsInVzZXJfaWQiOiJob3N0In0.5etH1CNnd453KKNsefF8KSG1nEREh_LmBFVK80ZZtDY";

const CHAT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaG9zdCJ9.REc2Uuad4zVpuuxg9NABI90qG15onoeJWcfJeTKq7-Y";

// 🎧 Synthwave 24/7 Radio
const MUSIC_STREAM_URL = "https://stream.laut.fm/synthwave";

// ➤ SOCIAL INTERACTIONS (❤️🔥🎧✨)
const reactionOptions = [
  { id: "love", icon: "❤️", tooltip: "Love" },
  { id: "fire", icon: "🔥", tooltip: "Fire" },
  { id: "headphones", icon: "🎧", tooltip: "Vibes" },
  { id: "sparkles", icon: "✨", tooltip: "Nice" },
];

// Custom Message renderer with reactions
function CustomMessage(props: any) {
  return (
    <MessageSimple
      {...props}
      reactionOptions={reactionOptions}
      hideReactionCount={false}
      hideReactionOwners={false}
    />
  );
}

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [videoClient] = useState(
    () =>
      new StreamVideoClient({
        apiKey,
        user: {
          id: userId,
          name: "Listening Party Host",
        },
        token: VIDEO_TOKEN,
      })
  );

  const [chatClient] = useState(() => StreamChatClient.getInstance(apiKey));
  const [call, setCall] = useState<Call | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);

  // INIT VIDEO + CHAT
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // VIDEO
      const c = videoClient.call("default", callId);
      await c.join();
      if (mounted) setCall(c);

      // CHAT
      await chatClient.connectUser(
        { id: userId, name: "Listening Party Host" },
        CHAT_TOKEN
      );

      const ch = chatClient.channel("messaging", channelId);
      await ch.watch();
      if (mounted) setChannel(ch);
    };

    init().catch((err) => console.error("Init error:", err));

    return () => {
      mounted = false;
      videoClient.disconnectUser();
      chatClient.disconnectUser();
    };
  }, [videoClient, chatClient]);

  // OPTIONAL: Auto-play music on first click anywhere
  useEffect(() => {
    if (!call) return;

    const playAfterClick = () => {
      audioRef.current?.play().catch(() => {});
    };

    window.addEventListener("click", playAfterClick, { once: true });

    return () => {
      window.removeEventListener("click", playAfterClick);
    };
  }, [call]);

  // LOADING STATE
  if (!call || !channel) {
    return (
      <div className="lp-root">
        <header className="lp-header">
          <h1 className="lp-logo">🎵 Listening Party</h1>
        </header>
        <main className="lp-main lp-main--center">
          <div className="lp-loading-card">Connecting to your room…</div>
        </main>
      </div>
    );
  }

  // Handlers for custom controls
  const toggleMic = () => {
    if (!call) return;
    call.microphone.toggle().catch(console.error);
  };

  const toggleCam = () => {
    if (!call) return;
    call.camera.toggle().catch(console.error);
  };

  const leaveCall = () => {
    if (!call) return;
    call.leave().catch(console.error);
  };

  // MAIN UI
  return (
    <div className="lp-root">
      {/* HEADER */}
      <header className="lp-header">
        <h1 className="lp-logo">🎵 Listening Party</h1>
        <div className="lp-user-pill">
          <span className="lp-user-dot" />
          Host · {userId}
        </div>
      </header>

      {/* BODY */}
      <main className="lp-main">
        <div className="lp-shell">
          {/* LEFT PANEL — VIDEO + MUSIC */}
          <section className="lp-panel lp-panel--video">
            <div className="lp-panel-header">
              <div className="lp-panel-title">Live Room</div>
              <div className="lp-panel-subtitle">Stream Video SDK</div>
            </div>

            <div className="lp-panel-body">
              <div className="lp-video-frame">
                <StreamVideo client={videoClient}>
                  <StreamCall call={call}>
                    <div className="lp-video-layout">
                      <div className="lp-video-main">
                        <SpeakerLayout />
                      </div>

                      {/* CUSTOM CONTROLS */}
                      <div className="lp-video-controls">
                        <div className="lp-custom-controls">
                          <button
                            type="button"
                            onClick={toggleMic}
                            title="Toggle mic"
                          >
                            🎙️ Mic
                          </button>
                          <button
                            type="button"
                            onClick={toggleCam}
                            title="Toggle camera"
                          >
                            📷 Cam
                          </button>
                          <button
                            type="button"
                            onClick={leaveCall}
                            title="Leave call"
                            className="lp-custom-controls-leave"
                          >
                            🚪 Leave
                          </button>
                        </div>
                      </div>
                    </div>
                  </StreamCall>
                </StreamVideo>
              </div>

              {/* MUSIC PLAYER */}
              <div className="lp-music-player">
                <div className="lp-music-meta">
                  <div className="lp-music-label">
                    24/7 Synthwave / 80s Retro Radio
                  </div>
                  <div className="lp-music-station">Synthwave — laut.fm</div>
                </div>

                <audio ref={audioRef} controls src={MUSIC_STREAM_URL}>
                  Your browser does not support audio.
                </audio>
              </div>
            </div>
          </section>

          {/* RIGHT PANEL — CHAT */}
          <section className="lp-panel lp-panel--chat">
            <div className="lp-panel-header">
              <div className="lp-panel-title">Backchannel Chat</div>
              <div className="lp-panel-subtitle">Stream Chat SDK</div>
            </div>

            <div className="lp-panel-body lp-panel-body--chat">
              <Chat client={chatClient}>
                <Channel channel={channel} Message={CustomMessage}>
                  <Window>
                    <MessageList />
                    <MessageInput />
                  </Window>
                </Channel>
              </Chat>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
