import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  type DocumentationVideoRecord,
  documentationVideoFromRecord,
  documentationVideos,
  GETTING_STARTED_VIDEO_PAGE_KEY,
  getDocumentationVideo,
} from "./documentation-videos.ts";
import {
  claimsUserId,
  type DashboardDecision,
  decideDashboardRequest,
  getDashboardAdminUserIds,
  isDashboardAdmin,
} from "./supabase/admin.ts";
import { parseYouTubeVideoId, youtubeEmbedUrl } from "./youtube.ts";

const ADMIN = "11111111-1111-4111-8111-111111111111";
const OTHER = "22222222-2222-4222-8222-222222222222";
const VIDEO_ID = "dQw4w9WgXcQ";

function decide(
  overrides: Partial<Parameters<typeof decideDashboardRequest>[0]> = {},
): DashboardDecision {
  return decideDashboardRequest({
    pathname: "/dashboard",
    supabaseConfigured: true,
    sessionFailed: false,
    userId: null,
    adminUserIds: [ADMIN],
    ...overrides,
  });
}

describe("dashboard access", () => {
  test("anonymous, non-admin, and admin stay distinct", () => {
    assert.equal(isDashboardAdmin(null, [ADMIN]), false);
    assert.equal(isDashboardAdmin(OTHER, [ADMIN]), false);
    assert.equal(isDashboardAdmin(ADMIN.toUpperCase(), [ADMIN]), true);
    assert.equal(claimsUserId({ sub: OTHER }), OTHER);
    assert.equal(claimsUserId({ email: "person@example.com" }), null);
    assert.deepEqual(decide(), {
      type: "redirect",
      pathname: "/dashboard/login",
    });
    assert.deepEqual(decide({ userId: OTHER }), {
      type: "redirect",
      pathname: "/dashboard/login",
      error: "unauthorized",
    });
    assert.deepEqual(decide({ pathname: "/dashboard/login", userId: OTHER }), {
      type: "next",
    });
    assert.deepEqual(decide({ userId: ADMIN }), { type: "next" });
    assert.deepEqual(decide({ pathname: "/dashboard/login", userId: ADMIN }), {
      type: "redirect",
      pathname: "/dashboard",
    });
  });

  test("missing configuration and a failed session do not look like unauthorized", () => {
    assert.equal(getDashboardAdminUserIds("not-a-uuid"), null);
    assert.deepEqual(
      getDashboardAdminUserIds(` ${ADMIN.toUpperCase()}, nope `),
      [ADMIN],
    );
    assert.deepEqual(decide({ supabaseConfigured: false, userId: ADMIN }), {
      type: "redirect",
      pathname: "/dashboard/login",
      error: "configuration",
    });
    assert.deepEqual(
      decide({ pathname: "/dashboard/login/", supabaseConfigured: false }),
      {
        type: "next",
      },
    );
    assert.deepEqual(decide({ adminUserIds: null, userId: OTHER }), {
      type: "redirect",
      pathname: "/dashboard/login",
      error: "configuration",
    });
    assert.deepEqual(decide({ sessionFailed: true, userId: ADMIN }), {
      type: "redirect",
      pathname: "/dashboard/login",
      error: "unavailable",
    });
    assert.deepEqual(
      decide({ pathname: "/dashboard/login", sessionFailed: true }),
      {
        type: "next",
      },
    );
  });

  test("a signed-out visitor stays on the login page", () => {
    assert.equal(isDashboardAdmin(ADMIN, [ADMIN]), true);
    assert.equal(isDashboardAdmin(OTHER, [ADMIN]), false);
    assert.equal(
      decide({ pathname: "/dashboard/login", userId: null }).type,
      "next",
    );
  });
});

describe("YouTube urls", () => {
  test("accepts supported urls and ids", () => {
    for (const value of [
      VIDEO_ID,
      `https://www.youtube.com/watch?v=${VIDEO_ID}`,
      `https://youtu.be/${VIDEO_ID}`,
      `https://m.youtube.com/watch?v=${VIDEO_ID}`,
      `https://music.youtube.com/watch?v=${VIDEO_ID}`,
      `https://www.youtube-nocookie.com/embed/${VIDEO_ID}`,
      `https://www.youtube.com/shorts/${VIDEO_ID}`,
      `https://www.youtube.com/live/${VIDEO_ID}`,
      `https://www.youtube.com/v/${VIDEO_ID}`,
      `http://youtube.com/watch?v=${VIDEO_ID}`,
    ]) {
      assert.equal(parseYouTubeVideoId(value), VIDEO_ID, value);
    }
  });

  test("rejects credentials, other hosts, and malformed values", () => {
    for (const value of [
      "",
      "not-a-url",
      "dQw4w9WgXc",
      `https://user:pass@youtube.com/watch?v=${VIDEO_ID}`,
      `https://vimeo.com/${VIDEO_ID}`,
      `https://youtube.com.evil.example/watch?v=${VIDEO_ID}`,
      "javascript:alert(1)",
      "https://youtube.com/watch",
      "https://youtu.be/",
    ]) {
      assert.equal(parseYouTubeVideoId(value), null, value);
    }
    assert.equal(
      youtubeEmbedUrl(VIDEO_ID),
      `https://www.youtube-nocookie.com/embed/${VIDEO_ID}`,
    );
    assert.equal(youtubeEmbedUrl("short"), null);
  });
});

describe("optional documentation video", () => {
  test("getting started stays empty until a real video is configured", () => {
    assert.equal(
      documentationVideos[GETTING_STARTED_VIDEO_PAGE_KEY],
      undefined,
    );
    assert.equal(
      getDocumentationVideo(GETTING_STARTED_VIDEO_PAGE_KEY),
      undefined,
    );
    const record: DocumentationVideoRecord = {
      id: "video-1",
      pageKey: GETTING_STARTED_VIDEO_PAGE_KEY,
      title: "Install",
      youtubeUrl: `https://youtu.be/${VIDEO_ID}`,
      youtubeVideoId: VIDEO_ID,
      description: null,
      isPublished: false,
      displayOrder: 0,
      createdAt: "2026-09-27T00:00:00.000Z",
      updatedAt: "2026-09-27T00:00:00.000Z",
    };
    assert.equal(documentationVideoFromRecord(record), undefined);
    assert.equal(
      documentationVideoFromRecord({
        ...record,
        isPublished: true,
        youtubeUrl: "https://vimeo.com/1",
        youtubeVideoId: "nope",
      }),
      undefined,
    );
  });
});
