# NASAの実在資源マップ — 原本リンクと取得

このフォルダには新しい対戦試作で使う `arcadia_hirise.jpg`（HiRISE PSP_004097_2185）と `swim_ice.jpg`（PIA26045）を保存しています。画面用の切り出し・疑似着色画像と加工手順は [game/assets/sources.md](../../game/assets/sources.md) にあります。他の資源地図の出典・識別子は [NASA_RESOURCE_MAPS.md](../../docs/science/NASA_RESOURCE_MAPS.md) と [出典台帳](source_manifest.json) に収録しています。インターネット接続できる場合、追加のNASA公式JPEGは以下で取得できます。

```bash
python scripts/fetch_nasa_maps.py
```

取得対象: `PIA26045`, `PIA26046`, `PIA04253`, `PIA04256`, `PIA05154`, `PIA02056`。

NASAの公式説明ページを必ず併せて参照。地図の色を採掘可能量とみなさない。

外部データにはクレジットとライセンスの確認が必要。ESAの画像はESA Standard Licenceのため自動取得・同梱していない。
