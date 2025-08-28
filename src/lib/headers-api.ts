import Cookies from "js-cookie";

export const headersApi = {
  "Content-Type": "application/json",
  "x-session-id": Cookies.get("sessionId") || "",
  accessToken: Cookies.get("accessToken") || "",
};
