import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./app";

describe("App", () => {
  it("responds with 404 for unknown route", async () => {
    const res = await request(app).get("/unknown");
    expect(res.status).toBe(404);
  });
});
