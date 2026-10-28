# 金宵唱片 Golden Night Records

Company site for Golden Night Records 金宵唱片, a Taipei record label. The site introduces the label and its artists, and opens a detail view for each selected release.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm start
```

## Edit content

All public copy, contacts, and catalogue data live in [`lib/content.ts`](lib/content.ts).

- **Label:** `nameEn`, `nameZh`, city, `email`, `siteUrl`, `social`, and `logo`.
- **Artists:** `artists`. Use `biography: null` until a real biography is approved. `links` are verified listening or social URLs only.
- **Releases:** `releases`. `featuredOrder` controls the 金宵選曲 sequence and is separate from `date`. Leave `date`, `type`, `description`, `audio`, and `listeningLinks` null until they are confirmed.
- **About:** `aboutParagraphs`.

`email` is shown as a `mailto:` link only when it is a valid address. `social` and artist `links` are shown only for `http` or `https` URLs. Listening links accept Spotify (`open.spotify.com`), Apple Music (`music.apple.com`), YouTube (`youtube.com`, `youtu.be`, `music.youtube.com`), or `service: "other"` with your own label. Search-result URLs are ignored.

Set `siteUrl` to the real absolute origin, for example `https://example.com`, before sharing. It becomes `metadataBase`, and the share image at `public/og.jpg` is then attached to Open Graph and Twitter cards. Until `siteUrl` is set, the site does not publish a share-image URL.

### Images

| Kind | Folder | Content field |
| --- | --- | --- |
| Logo | `public/images/logo.png` | `label.logo` |
| Portraits | `public/images/artists/` | `artist.portrait` |
| Covers | `public/images/releases/` | `release.artwork` |

Use the real filename, pixel width, height, and alt text. Do not crop faces or cover typography. If `portrait` or `artwork` is `null`, the site draws a type-only stand-in.

Current files:

- `public/images/logo.png` is the header lockup. `public/images/logo-on-dark.png` is the same mark with cream lettering for the forest-green footer. Replace both if the logo file changes.
- `public/images/artists/romy-lo.jpg` from the supplied Romy Lo portrait.
- `public/images/artists/yan.jpg` from the warmer Yan portrait (`yan_profile_picture.png`). A second portrait is in the Yan asset folder if you want to swap it.
- Release covers from the Romy Lo and Yan folders. Each remaining track has a verified Spotify link.

### Audio

Optional playback appears only when `release.audio` points at a real file, such as `/audio/track.mp3` placed in [`public/audio/`](public/audio/). The player starts only after 播放, can pause, reports a failed file, and plays one track at a time. Masters were not copied into this site.

## Still needed

These fields are intentionally empty. The public site does not invent them.

- Contact email (`label.email`). Until then, the contact section says 聯絡資訊即將公布.
- Social links (`label.social`).
- Public site URL (`label.siteUrl`) for absolute sharing metadata.
- Artist biographies (`biography`) and artist listening or social links (`links`).
- Release dates, types, descriptions, and verified Spotify, Apple Music, or YouTube URLs. Detail views say 收聽連結即將公布.
- Optional authorized audio files.
