"use client";

import { useEffect, useState } from "react";

type UserOut = {
  id: number;
  provider: string;
  nickname: string;
};

type MeStatusOut = {
  logged_in: boolean;
  user: UserOut | null;
};

type AuthState =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "member"; user: UserOut };

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function Header() {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function loadStatus() {
      try {
        const res = await fetch(`${API_BASE_URL}/me/status`);
        if (!res.ok) throw new Error(`unexpected status ${res.status}`);
        const data: MeStatusOut = await res.json();
        if (cancelled) return;

        if (data.logged_in && data.user) {
          setAuth({ status: "member", user: data.user });
        } else {
          setAuth({ status: "guest" });
        }
      } catch {
        if (!cancelled) setAuth({ status: "guest" });
      }
    }

    loadStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid #e5e5e5",
        fontFamily: "system-ui",
      }}
    >
      <span style={{ fontWeight: 700 }}>공모준</span>
      <div>
        {auth.status === "loading" && (
          <span
            aria-busy="true"
            aria-label="로그인 상태 확인 중"
            style={{
              display: "inline-block",
              width: 64,
              height: 20,
              borderRadius: 4,
              backgroundColor: "#e5e5e5",
              opacity: 0.6,
            }}
          />
        )}
        {auth.status === "guest" && (
          <button type="button" style={{ padding: "6px 12px" }}>
            로그인
          </button>
        )}
        {auth.status === "member" && <span>{auth.user.nickname}</span>}
      </div>
    </header>
  );
}
