# Documentation videos database setup

Apply `migrations/20261008000000_documentation_videos.sql` before using the Videos dashboard. For a linked Supabase project, use `supabase db push`; alternatively run the migration once in the project's SQL Editor as the database owner. It creates the videos table, index, constraints, and RLS policies together, inside a transaction. If a videos table already exists, review its schema and policies before applying; this migration deliberately fails rather than silently accepting a different schema.

Create the admin through Supabase Authentication, then add their existing UID to the private database allowlist using the SQL Editor:

```sql
insert into private.dashboard_admins (user_id)
values ('<existing-admin-auth-user-uuid>'::uuid)
on conflict do nothing;
```

Set the same UID in the server-only `DASHBOARD_ADMIN_USER_IDS` environment variable. For multiple admins, provision each database row and use comma-separated UIDs in the environment variable. Neither authenticated users nor anonymous visitors can edit or read the admin allowlist. Keep the `private` schema out of Supabase's exposed API schemas.

Anonymous visitors and ordinary authenticated users can only read published videos. Only allowlisted admins can read drafts, insert videos or update publication state. No API role can delete videos or grant itself admin rights. Writes use the signed-in user's JWT; the application does not need a service-role key. Remove an admin from both the database allowlist and environment configuration when revoking access.

For local tests without a cloud database, `npm test` applies the real migration to an isolated PGlite PostgreSQL instance with simulated Supabase auth roles, and checks anonymous, ordinary-user and admin permissions. These tests do not apply migrations to production.
