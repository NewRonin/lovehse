export function setTicketSession(event: any, ticketNumber: string) {
  setCookie(event, "ticket", ticketNumber, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function getTicketSession(event: any) {
  return getCookie(event, "ticket");
}

export function clearTicketSession(event: any) {
  deleteCookie(event, "ticket");
}
