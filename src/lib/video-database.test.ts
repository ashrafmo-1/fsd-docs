import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import { PGlite } from "@electric-sql/pglite";

test("videos migration enforces public reads and administrator-only writes", async () => {
  const db = new PGlite();
  try {
    await db.exec(`
      create role anon nologin;
      create role authenticated nologin;
      create schema auth;
      create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as
        $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
      grant usage on schema auth to anon, authenticated;
      alter default privileges in schema public grant all on tables to anon, authenticated;
      insert into auth.users values ('11111111-1111-4111-8111-111111111111'), ('22222222-2222-4222-8222-222222222222');
    `);
    await db.exec(
      fs.readFileSync(
        new URL(
          "../../supabase/migrations/20261008000000_documentation_videos.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    await db.exec(`
      insert into private.dashboard_admins values ('11111111-1111-4111-8111-111111111111');
      insert into public.videos(page_key,title,youtube_url,youtube_video_id,is_published)
      values ('/docs/configuration','Public','dQw4w9WgXcQ','dQw4w9WgXcQ',true),
             ('/docs/configuration','Draft','dQw4w9WgXcQ','dQw4w9WgXcQ',false);
      set role anon;
    `);
    assert.equal(
      (await db.query("select * from public.videos")).rows.length,
      1,
    );
    await assert.rejects(
      db.exec(
        "insert into public.videos(page_key,title,youtube_url,youtube_video_id) values ('/docs','Attack','dQw4w9WgXcQ','dQw4w9WgXcQ')",
      ),
    );
    await assert.rejects(db.exec("update public.videos set title = 'Attack'"));
    await db.exec(
      "reset role; set role authenticated; select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',false)",
    );
    assert.equal(
      (await db.query("select * from public.videos")).rows.length,
      1,
    );
    assert.equal(
      (await db.query("update public.videos set title = 'Attack' returning id"))
        .rows.length,
      0,
    );
    await assert.rejects(
      db.exec(
        "insert into public.videos(page_key,title,youtube_url,youtube_video_id) values ('/docs','Attack','dQw4w9WgXcQ','dQw4w9WgXcQ')",
      ),
    );
    await assert.rejects(
      db.exec(
        "insert into private.dashboard_admins values ('22222222-2222-4222-8222-222222222222')",
      ),
    );
    await assert.rejects(db.query("select * from private.dashboard_admins"));
    await db.exec(
      "select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',false)",
    );
    assert.equal(
      (await db.query("select * from public.videos")).rows.length,
      2,
    );
    assert.equal(
      (
        await db.query(
          "update public.videos set is_published = false returning id",
        )
      ).rows.length,
      2,
    );
    await db.exec(
      "insert into public.videos(page_key,title,youtube_url,youtube_video_id) values ('/docs','Admin draft','dQw4w9WgXcQ','dQw4w9WgXcQ')",
    );
    await assert.rejects(db.exec("delete from public.videos"));
    await assert.rejects(
      db.exec(
        "insert into public.videos(page_key,title,youtube_url,youtube_video_id) values ('/docs','Invalid','bad','bad')",
      ),
    );
    await db.exec("reset role; set role anon");
    assert.equal(
      (await db.query("select * from public.videos")).rows.length,
      0,
    );
  } finally {
    await db.close();
  }
});
