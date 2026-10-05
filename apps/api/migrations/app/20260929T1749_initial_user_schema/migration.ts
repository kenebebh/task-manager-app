#!/usr/bin/env -S node
import type { Contract as Start } from "../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract";
import startContract from "../../snapshots/0c0734babd6eeb868fee1f281ca96963022475611560e9f170f465daa35f8599/contract.json" with { type: "json" };
import type { Contract as End } from "../../snapshots/67b6ec79ecafd51df0da1c922ef4bd1e2b27dfad706344000591bd337d5ff157/contract";
import endContract from "../../snapshots/67b6ec79ecafd51df0da1c922ef4bd1e2b27dfad706344000591bd337d5ff157/contract.json" with { type: "json" };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  primaryKey,
} from "@prisma/orm-postgres/migration";

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: "public",
        table: "User",
        columns: [
          col("createdAt", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("email", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("firstName", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("id", "text", {
            notNull: true,
            codecRef: { codecId: "pg/text@1" },
          }),
          col("lastName", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("passwordHash", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-temporal@1" },
          }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.addUnique({
        schema: "public",
        table: "User",
        constraint: "User_email_key",
        columns: ["email"],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
