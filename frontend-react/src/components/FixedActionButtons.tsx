import React, { useEffect, useMemo, useState } from "react";
import { ChatPopup } from "./ChatPopup";
import ChatBox from "./ChatBox";

interface userInfo {
  name: string;
  phone: string;
  gender: "Nam" | "Nữ";
}

const FixedActionButtons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [userInfo, setUserInfo] = useState<userInfo | null>(() => {
    const saved = localStorage.getItem("user-chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        localStorage.setItem("guest-uuid", parsed.phone);
        return parsed;
      } catch (err) {
        console.error("❌ Lỗi parse user-chat:", err);
      }
    }
    return null;
  });

  const memoRoomId = useMemo(() => {
    if (!userInfo) return null;
    return `chat_user_${userInfo.phone}_0`;
  }, [userInfo]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="position-fixed d-flex flex-column gap-2 align-items-end me-3 me-md-4" style={{ bottom: "1rem", right: "1rem", zIndex: 1040 }}>
        {showScrollTop && (
          <button onClick={handleScrollTop} className="btn btn-danger text-white shadow rounded-pill py-1 px-2 text-sm">
            ↑<br />Top
          </button>
        )}
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-warning text-dark px-3 py-2 shadow-sm fw-semibold shake" style={{ fontSize: "14px", borderRadius: "10px" }}>
            🎁 Voucher 500K
          </span>
          <button onClick={() => setShowChat(true)} className="btn p-0 border-0 bg-transparent">
            <img src="/imgs/logo_tpsolar.webp" alt="Chat với SolarTP" width={50} height={50} className="rounded-circle shadow"
              style={{ transition: "transform 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}/>
          </button>
        </div>
      </div>

      {showChat && (userInfo ? (
        <ChatBox 
        key={memoRoomId} 
        roomId={memoRoomId || ""} 
        senderId={userInfo.phone} 
        show={true} 
        onClose={() => setShowChat(false)} />
      ) : (
        <ChatPopup show={true} onClose={() => setShowChat(false)} onSubmit={(data) => {
          setUserInfo(data);
          localStorage.setItem("user-chat", JSON.stringify(data));
          localStorage.setItem("guest-uuid", data.phone);
        }} />
      ))}
    </>
  );
};

export default FixedActionButtons;