begin;

-- Optional plain-text transcript shown under each documentation video.
alter table public.videos
  add column transcript text check (length(transcript) <= 50000);

commit;
