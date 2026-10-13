import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequest, ApiError } from "../src/api/client.js";
test("unconfigured frontend cannot send login or writes anywhere", async () => {
  let called = false;
  const request = createRequest("", () => {
    called = true;
  });
  await assert.rejects(
    request("/admin/login", {
      method: "POST",
      body: { username: "x", password: "x" },
    }),
    (e) => e instanceof ApiError && e.status === 503,
  );
  assert.equal(called, false);
});
test("backend requests carry session cookies and preserve JSON payloads", async () => {
  let input;
  const request = createRequest("https://api.example.com", async (...args) => {
    input = args;
    return new Response(JSON.stringify({ id: "saved" }), { status: 200 });
  });
  assert.deepEqual(
    await request("/admin/programs", { method: "POST", body: { revision: 2 } }),
    { id: "saved" },
  );
  assert.equal(input[0], "https://api.example.com/admin/programs");
  assert.equal(input[1].credentials, "include");
  assert.deepEqual(JSON.parse(input[1].body), { revision: 2 });
});
test("unauthorized and stale-write errors are not converted to success", async () => {
  for (const status of [401, 403, 409, 500]) {
    const request = createRequest(
      "/api",
      async () => new Response("", { status }),
    );
    await assert.rejects(
      request("/admin/articles/1", { method: "DELETE" }),
      (e) => e.status === status,
    );
  }
});
test("successful no-content responses and multipart uploads work", async () => {
  let headers;
  const request = createRequest("/api", async (_, options) => {
    headers = options.headers;
    return new Response(null, { status: 204 });
  });
  const body = new FormData();
  body.append("file", new Blob(["test"], { type: "image/png" }), "cover.png");
  assert.equal(await request("/admin/media", { method: "POST", body }), null);
  assert.equal(headers["Content-Type"], undefined);
});
