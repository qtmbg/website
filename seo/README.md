# seo/

Machinery for search discovery. Nothing here changes a word of the site.

| File | What it is |
|---|---|
| `indexnow.key` | The public IndexNow key. Not a secret: the build serves it at `/<key>.txt`, which is how Bing verifies ownership of the submission. Rotating it means changing this file and re-running the build. |
| `lastmod.json` | Per URL content hash and the date that content last changed. The build compares the hash of each rendered page against this file and only moves a date when the page really moved. Commit it with the change that caused it. |

`BingSiteAuth.xml` is written only when `BING_SITE_AUTH` is set in the build
environment. The token comes from Bing Webmaster Tools and is not invented here.
