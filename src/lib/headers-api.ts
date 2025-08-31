import Cookies from "js-cookie";

export const headersApi = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${Cookies.get("accessToken")}`,
  "x-session-id": Cookies.get("sessionId") || "",
};
