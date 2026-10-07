import assert from "node:assert/strict";
import { test } from "node:test";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { VideoDraft } from "./video-draft.ts";
import { readVideo, writeVideo } from "./video-store.ts";

const draft: VideoDraft = {
  id: "11111111-1111-4111-8111-111111111111",
  pageKey: "/docs/configuration",
  title: "Configuration",
  youtubeUrl: "dQw4w9WgXcQ",
  youtubeVideoId: "dQw4w9WgXcQ",
  description: null,
  isPublished: true,
  displayOrder: 0,
};

function client(result: { data: unknown; error: unknown }, fail = false) {
  const calls: unknown[][] = [];
  const query = {
    from: (...args: unknown[]) => {
      calls.push(["from", ...args]);
      return query;
    },
    update: (...args: unknown[]) => {
      calls.push(["update", ...args]);
      return query;
    },
    insert: (...args: unknown[]) => {
      calls.push(["insert", ...args]);
      return query;
    },
    select: (...args: unknown[]) => {
      calls.push(["select", ...args]);
      return query;
    },
    eq: (...args: unknown[]) => {
      calls.push(["eq", ...args]);
      return query;
    },
    maybeSingle: async () => {
      calls.push(["maybeSingle"]);
      if (fail) throw new Error("offline");
      return result;
    },
  };
  return { db: query as unknown as SupabaseClient, calls };
}

test("saving or publishing a missing row returns an error", async () => {
  for (const input of [
    { draft },
    { id: draft.id as string, published: false },
  ]) {
    const fake = client({ data: null, error: null });
    assert.deepEqual(await writeVideo(fake.db, input), {
      ok: false,
      error: "This video was not found.",
    });
    assert.ok(
      fake.calls.some((c) => c[0] === "select" && c[1] === "id, page_key"),
    );
    assert.ok(
      fake.calls.some(
        (c) => c[0] === "eq" && c[1] === "id" && c[2] === draft.id,
      ),
    );
  }
});

test("successful insert and update return the affected database row", async () => {
  for (const id of [null, draft.id]) {
    const fake = client({
      data: { id: draft.id, page_key: draft.pageKey },
      error: null,
    });
    assert.deepEqual(await writeVideo(fake.db, { draft: { ...draft, id } }), {
      ok: true,
      pageKey: draft.pageKey,
    });
    assert.ok(fake.calls.some((c) => c[0] === (id ? "update" : "insert")));
  }
});

test("permission and transport failures never report a successful write", async () => {
  assert.deepEqual(
    await writeVideo(client({ data: null, error: { code: "42501" } }).db, {
      draft,
    }),
    { ok: false, error: "This account cannot manage videos." },
  );
  assert.equal(
    (await writeVideo(client({ data: null, error: null }, true).db, { draft }))
      .ok,
    false,
  );
});

test("single-video reads distinguish a missing row from a backend failure", async () => {
  const absent = client({ data: null, error: null });
  assert.deepEqual(await readVideo(absent.db, draft.id as string), {
    row: null,
  });
  assert.ok(
    absent.calls.some(
      (c) => c[0] === "eq" && c[1] === "id" && c[2] === draft.id,
    ),
  );
  assert.deepEqual(
    await readVideo(
      client({ data: null, error: { message: "offline" } }).db,
      draft.id as string,
    ),
    { error: "Videos could not be loaded." },
  );
  assert.deepEqual(
    await readVideo(
      client({ data: null, error: null }, true).db,
      draft.id as string,
    ),
    { error: "Videos could not be loaded." },
  );
});
