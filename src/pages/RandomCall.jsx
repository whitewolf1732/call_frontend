import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import AgoraRTC from "agora-rtc-sdk-ng";

const socket = io("https://call-site.onrender.com");
const APP_ID = "665f7a8ddf874c68a762eeb828338b90";

const RandomCall = () => {
  const [status, setStatus] = useState("idle"); // idle, searching, connected
  const [partnerId, setPartnerId] = useState(null);
  const clientRef = useRef(null);
  const localAudioTrackRef = useRef(null);
  const remoteAudioTrackRef = useRef(null);

  const joinChannel = async (channelName, token, uid) => {
    try {
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      clientRef.current = client;

      await client.join(APP_ID, channelName, token, uid);
      
      // Create and publish local audio track
      const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localAudioTrackRef.current = localAudioTrack;
      await client.publish(localAudioTrack);

      // Subscribe to remote user
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "audio") {
          remoteAudioTrackRef.current = user.audioTrack;
          user.audioTrack.play();
          setStatus("connected");
        }
      });

      client.on("user-left", () => {
        setStatus("partnerLeft");
        leaveChannel();
      });

    } catch (error) {
      console.error("Error joining channel:", error);
      setStatus("error");
    }
  };
  const endCall = () => {
    if (clientRef.current) {
      clientRef.current.leave();
      clientRef.current = null;
    }
    if (localAudioTrackRef.current) {
      localAudioTrackRef.current.close();
      localAudioTrackRef.current = null;
    }
    if (remoteAudioTrackRef.current) {
      remoteAudioTrackRef.current.stop();
      remoteAudioTrackRef.current = null;
    }
    
    // Notify server and partner
    socket.emit("endCall", { partnerId });
    setStatus("idle");
    setPartnerId(null);
  };

  useEffect(() => {
    // Add this new listener
    socket.on("callEnded", ({ initiator }) => {
      if (initiator) {
        // I initiated the call end
        setStatus("idle");
      } else {
        // Partner ended the call
        setStatus("partnerLeft");
      }
      leaveChannel(); // Clean up resources
    });

    return () => {
      socket.off("callEnded");
      // ... existing cleanup ...
    };
  }, []);
  const leaveChannel = () => {
    if (clientRef.current) {
      clientRef.current.leave();
      clientRef.current = null;
    }
    if (localAudioTrackRef.current) {
      localAudioTrackRef.current.close();
      localAudioTrackRef.current = null;
    }
    if (remoteAudioTrackRef.current) {
      remoteAudioTrackRef.current.stop();
      remoteAudioTrackRef.current = null;
    }
    socket.emit("leaveCall");
  };

  const startRandomCall = () => {
    setStatus("searching");
    socket.emit("randomCall");
  };

  useEffect(() => {
    socket.on("callMatched", ({ channelName, token, uid, partnerId }) => {
      setPartnerId(partnerId);
      joinChannel(channelName, token, uid);
    });

    return () => {
      leaveChannel();
      socket.off("callMatched");
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl mb-6 font-bold">Random Voice Chat</h2>
      
      {status === "idle" && (
        <button 
          onClick={startRandomCall}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Random Call
        </button>
      )}

      {status === "searching" && (
        <div className="flex flex-col items-center">
          <div className="animate-pulse flex space-x-2 mb-4">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
          <p>Looking for someone to chat with...</p>
          <button 
            onClick={leaveChannel}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      )}


{status === "connected" && (
  <div className="flex flex-col items-center">
    <p className="mb-4">Connected with user</p>
    <div className="w-16 h-16 bg-green-500 rounded-full mb-4 flex items-center justify-center">
      <span className="text-white text-xl">🎤</span>
    </div>
    <button 
      onClick={endCall}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      End Call
    </button>
  </div>
)}

{status === "partnerLeft" && (
  <div className="text-center">
    <p className="mb-4 text-red-500">Your partner has left the call</p>
    <button 
      onClick={() => {
        setStatus("idle");
        setPartnerId(null);
      }}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      random Call
    </button>
  </div>
)}
    </div>
  );
};

export default RandomCall;