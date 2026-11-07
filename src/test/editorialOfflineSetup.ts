import { afterAll, vi } from "vitest";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import tls from "node:tls";

let attempts = 0;
function deny(): never {
  attempts += 1;
  throw new Error("EDITORIAL_NETWORK_FORBIDDEN");
}
// Mesmo que a aplicação capture o erro, a tentativa invalida a suíte no afterAll.
vi.stubGlobal("fetch", async () => deny());
vi.stubGlobal("WebSocket", class { constructor() { deny(); } });
vi.spyOn(http, "request").mockImplementation(deny);
vi.spyOn(http, "get").mockImplementation(deny);
vi.spyOn(https, "request").mockImplementation(deny);
vi.spyOn(https, "get").mockImplementation(deny);
vi.spyOn(net.Socket.prototype, "connect").mockImplementation(deny);
vi.spyOn(tls, "connect").mockImplementation(deny);
afterAll(() => {
  if (attempts !== 0) throw new Error("EDITORIAL_NETWORK_ATTEMPTS=" + attempts);
});
