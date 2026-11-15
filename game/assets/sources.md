# ゲーム地図の出典と加工

## 現行版：Arcadia Planitiaのクレーター

- 地域：火星Arcadia Planitiaの約1 km径の新しい衝突クレーター。[HiRISE DTM観測 ESP_025735_2185 / ESP_025801_2185](https://www.uahirise.org/dtm/dtm.php?ID=ESP_025735_2185)。NASA/JPL-Caltech/University of Arizona。
- 標高の元データ：[PDS DTEEC_025735_2185_025801_2185_A01.IMG](https://www.uahirise.org/PDS/DTM/ESP/ORB_025700_025799/ESP_025735_2185_ESP_025801_2185/DTEEC_025735_2185_025801_2185_A01.IMG)。32 bit浮動小数点、正距円筒図法、惑星中心緯度、東経。PDSヘッダーの解像度は約1.003 m/pixel、標高基準はMars 2000 areoid。
- 切り出し：DTMの0基準行5000〜7599・列2000〜4599。約2.61 km四方、北緯約38.1276〜38.1717°・東経約191.5567〜191.6106°。北が上。欠損値のない領域を選び、11×11マスへ各領域の標高中央値を採用。1マス約237.1 m。保存値の標高は整数mに丸めた。
- `arcadia_crater_surface.webp`：その標高データを疑似カラーと陰影で表示。見やすさのために高さの色差・陰影を強調しており、光学写真ではない。`arcadia_crater_terrain.json`と`.js`が標高、隣接高低差、範囲を保持する。生成方法は [`scripts/prepare_arcadia_crater.py`](../../scripts/prepare_arcadia_crater.py) に記載。`--fetch`でPDSの必要な行だけを取得し再生成できる。
- `arcadia_crater_altimetry.jpg`はHiRISEが公開するDTM全体の色付き標高図。盤面の切り出しとは表示範囲が異なる。観測との比較用。

実測標高の差が大きい場所をそのまま通行不可にすると、最初の地下氷へ行く操作が分かりにくく、西側の谷19マスへ工作機が入れなかった。現在は独立した2マス `(4,6)`・`(6,4)` のみを**ゲーム上の山**とし、登坂技術の研究で通行・建設できる。他の地表は標高差に関係なく移動可能。補給は2歩以内で通行可能な経路、通信・セントリーの射線は途中の山マスで遮られる。山マスの選定、技術の費用と効果は観測から直接決まる値ではなく、遊びのための抽象化。実際の地形高度は地図・タイル詳細に残す。

地下氷、鉄原料、レゴリスの各マス、資源の採掘量、基地や前哨地の配置は**ゲーム上の仮定**。下記SWIM画像は広域で地下氷の候補を示す資料であり、このクレーターのどのマスに氷があるかは示さない。ゲームでは観測ローバーの調査を通して候補を確定する演出とした。

## 広域の参考画像と旧版

- `assets/nasa_maps/swim_ice.jpg`：NASA/JPL-Caltech/Planetary Science Instituteの[PIA26045/SWIM](https://www.jpl.nasa.gov/images/pia26045-swim-map-shows-subsurface-water-ice-on-mars/)の公式画像。
- `arcadia_surface.webp`, `arcadia_source_crop.webp`：旧版で用いた[HiRISE PSP_004097_2185](https://hirise.lpl.arizona.edu/PSP_004097_2185)の画像。旧版は写真を着色したもので標高を使っていなかった。現行盤面には使用していない。生成は `scripts/prepare_arcadia_map.py`。

## Task4科学教材の図（2026-11-15）

`game/learn/electrolysis-diagram.svg`、`moxie-diagram.svg`、`farming-diagram.svg`、`storage-diagram.svg`、`mineral-diagram.svg`、`smelting-diagram.svg`、`metalwork-diagram.svg`、`ceramics-diagram.svg`、`recycling-diagram.svg` は、このプロジェクトで新たに描いた概念図。NASAの原図・写真をトレースまたは転載していない。装置の内部配置や配管形状は教育用の模式表現で、実機の設計図ではない。各図の科学的な入出力と題材別の一次資料は [科学教材の監査](../../docs/science/TASK4_LESSON_AUDIT.md) に記録する。NASAの外部ページにある写真・動画はリンクで参照し、ゲームに再配布していない。


