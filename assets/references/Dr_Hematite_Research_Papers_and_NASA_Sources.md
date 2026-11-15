# Dr. Hematite — Research Papers & NASA Scientific Sources

**Project:** NASA Space Apps Challenge 2026 / *Build a Junior Astronaut Mission Trainer*  
**Version:** 2026-11-14  
**Purpose:** Codex / Google NotebookLM のソース資料、NASA Space Apps提出資料の参考文献台帳。  
**Scope:** これまでの会話で参照した主要研究・技術と、その開発に直結する一次資料。論文の全文転載ではなく、原著へのリンク、日本語要旨、利用先を整理した文献ガイド。

> **重要:** 火星での実測・技術実証、地球での模擬材料試験、計算モデル、将来ミッションの構想、ゲーム独自の仮定は異なる。下記の「根拠の種類」を確認し、観測から採掘量や生産性を勝手に確定しないこと。

## 目次

1. [火星探査計画・基地の初期装備](#1-火星探査計画基地の初期装備)
2. [水氷・資源分布・地質](#2-水氷資源分布地質)
3. [酸素製造・生命維持・電力](#3-酸素製造生命維持電力)
4. [レゴリス・鉄・3Dプリント・バイオプラスチック](#4-レゴリス鉄3dプリントバイオプラスチック)
5. [放射線・食料生産](#5-放射線食料生産)
6. [NASA/ESA の実データマップと技術資料](#6-nasaesa-の実データマップと技術資料)
7. [科学ロードマップとの対応](#7-科学ロードマップとの対応)
8. [NotebookLM / Codex 利用メモ](#8-notebooklm--codex-利用メモ)

---

## 1. 火星探査計画・基地の初期装備

### [P01] Mission Architecture Using the SpaceX Starship Vehicle to Enable a Sustained Human Presence on Mars (2022)

- **著者:** Jennifer L. Heldmann et al.
- **掲載:** *New Space*, 10(3), 259–273 (2022)
- **DOI:** https://doi.org/10.1089/space.2020.0058
- **オープン全文:** https://pmc.ncbi.nlm.nih.gov/articles/PMC9527650/
- **根拠の種類:** 査読論文・将来ミッションの設計構想。現実に実施された有人火星ミッションの貨物目録ではない。
- **内容:** 先行無人輸送、拠点設備の事前配置、地下氷の探査、現地資源利用（ISRU）により有人拠点を準備する計画を提案。
- **Dr. Hematite:** 最初に持ち込む設備（居住区・電源・ドリル・ローバー・生命維持装置・備蓄）と、現地調達に切り替える文明発展の段階設計。

### [P02] A Discussion of Integrated Life Support and In Situ Resource Utilization Architectures for Mars Surface Missions (2018)

- **著者:** Morgan B. Abney, Gerald B. Sanders
- **資料:** NASA NTRS / International Conference on Environmental Systems (ICES), 2018
- **公式:** https://ntrs.nasa.gov/citations/20180004459
- **根拠の種類:** 会議発表の技術資料（NTRS掲載情報はAbstract）。査読付きジャーナル論文として扱わない。
- **内容:** 宇宙船内での水・空気の再生と、外部からの現地資源採取を組み合わせる複数の構成を検討。
- **Dr. Hematite:** 「水再生装置を直す」「地下氷を掘る」という2つの行動に異なるコストを持たせ、研究・電力・時間を競合させる。

## 2. 水氷・資源分布・地質

### [P03] Refined Mapping of Subsurface Water Ice on Mars to Support Future Missions (2025)

- **著者:** Gareth A. Morgan et al.
- **掲載:** *The Planetary Science Journal*, 6, 29 (2025)
- **DOI:** https://doi.org/10.3847/PSJ/ad9b24
- **USGS記録:** https://www.usgs.gov/publications/refined-mapping-subsurface-water-ice-mars-support-future-missions
- **根拠の種類:** 査読論文・複数の軌道観測結果を統合した地下氷の推定マップ。
- **内容:** SWIM計画の地下氷調査を更新。およそ3 km/pixelの地図を用いて浅い氷から深い氷まで異なる深度帯を評価する。
- **Dr. Hematite:** 地下氷候補地点を絞り、ローバー探査→試掘→採掘へ進むゲーム地形レイヤー。
- **注意:** 色の強さをそのまま「1ターンで採れる水の量」に変換しない。

### [P04] Subsurface Water Ice Mapping on Mars: A Probabilistic Approach (2026)

- **著者:** Samuel W. Courville et al.
- **掲載:** *The Planetary Science Journal*, 7, 183 (2026)
- **DOI:** https://doi.org/10.3847/PSJ/ae8904
- **USGS記録:** https://www.usgs.gov/publications/subsurface-water-ice-mapping-mars-a-probabilistic-approach
- **根拠の種類:** 査読論文・観測から地下氷の存在確率と不確実性を評価。
- **内容:** 火星中緯度の地下氷候補を確率的に統合し、緯度や観測条件による不確実性を可視化。
- **Dr. Hematite:** 氷の探索場所を選ぶ際の不確実性、探査装置のアップグレード、失敗しても新しい知識が残る仕組み。

### [P05] Geologic Map of Mars (2014)

- **著者:** Kenneth L. Tanaka et al.
- **資料:** U.S. Geological Survey Scientific Investigations Map 3292 (2014)
- **DOI:** https://doi.org/10.3133/sim3292
- **公式マップ・GIS:** https://pubs.usgs.gov/sim/3292/
- **根拠の種類:** USGS公式科学地質図・技術マップ。一般的な雑誌論文ではない。
- **内容:** 火星全球の地質単元・地形の年代・地質的関係の整理。
- **Dr. Hematite:** 地形基盤として使用し、着陸地域や探索マップの地質設定を説明する。
- **注意:** 地質マップ自体は「ヘマタイト鉱山の所在地」ではない。

### [P06] A Principal Component Index for Identifying and Surveying Martian Chloride Salts Using THEMIS Multispectral Thermal Infrared Images (2026)

- **著者:** J. R. Hill, P. R. Christensen
- **掲載:** *Journal of Geophysical Research: Planets* (2026)
- **DOI:** https://doi.org/10.1029/2026JE009775
- **論文:** https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2026JE009775
- **根拠の種類:** 査読論文・THEMISデータによる塩化物堆積物の検出。
- **内容:** 火星の塩化物堆積物1,605か所を同定。分布は主に南半球の古い高地に集中。
- **Dr. Hematite:** 化学分析・塩類・土壌汚染の研究技術、上級素材探索の候補レイヤー。

### [P07] Spectral Evidence for Irradiated Halite on Mars (2024)

- **著者:** Michael S. Bramble, Kevin P. Hand
- **掲載:** *Scientific Reports*, 14, 5503 (2024)
- **DOI:** https://doi.org/10.1038/s41598-024-55979-6
- **オープン全文:** https://www.nature.com/articles/s41598-024-55979-6
- **根拠の種類:** 査読論文・可視光スペクトルに基づく鉱物の解釈。
- **内容:** 放射線照射により特徴が変化した岩塩（halite, NaCl）に関連するスペクトル的証拠を示す。
- **Dr. Hematite:** 衛星で観測される信号→鉱物同定→採取・精製という段階を学ぶ教材。

### [P08] Global Distribution and Classification of Martian Sulfate Deposits (2026)

- **著者:** Yilin Fan, Yu-Yan Sara Zhao, Fengke Cao, Xiaowen Yu
- **掲載:** *Chinese Science Bulletin* 71 (2026)
- **DOI:** https://doi.org/10.1360/CSB-2026-0092
- **英語ランディングページ:** https://www.sciengine.com/CSB/doi/10.1360/CSB-2026-0092
- **根拠の種類:** 査読誌に掲載された総説・統合的分布調査。
- **内容:** 火星各地の硫酸塩鉱物を地質学的成因・地形・軌道スペクトル・現地観測から整理。
- **Dr. Hematite:** 硫酸塩・塩類のサンプル分析、鉱物の用途選定、素材研究ツリー。

## 3. 酸素製造・生命維持・電力

### [P09] Mars Oxygen ISRU Experiment (MOXIE)—Preparing for Human Mars Exploration (2022)

- **著者:** Jeffrey A. Hoffman et al.
- **掲載:** *Science Advances*, 8(35), eabp8636 (2022)
- **DOI:** https://doi.org/10.1126/sciadv.abp8636
- **オープン全文:** https://pmc.ncbi.nlm.nih.gov/articles/PMC9432831/
- **根拠の種類:** 査読論文・火星上での技術実証。
- **内容:** 火星大気のCO₂を固体酸化物電解で酸素に変えるMOXIEの実証と有人ミッションへの応用を説明。
- **Dr. Hematite:** 大気採取→圧縮→高温電解→O₂回収という酸素製造の発明ルート。
- **注意:** MOXIE実験機の生産能力は、そのまま有人基地を支える規模ではない。副生するCOの毒性・排気管理も必要。

### [P10] Mars Oxygen ISRU Experiment (MOXIE) (2021)

- **著者:** Michael Hecht et al.
- **掲載:** *Space Science Reviews*, 217, 9 (2021)
- **DOI:** https://doi.org/10.1007/s11214-020-00782-8
- **MIT記録:** https://dspace.mit.edu/entities/publication/2c21381c-2bcb-4419-8ff6-702d8f2b8766
- **根拠の種類:** 査読論文・MOXIE装置の設計および技術実証計画。
- **内容:** MOXIEの構成、要求仕様、酸素の品質と生成量、将来の大規模装置へのつながりを解説。
- **Dr. Hematite:** 技術ノードに「熱」「電力」「装置の運転条件」「製造量」を付ける参考。

### [P11] Space Crop Considerations for Human Exploration (NASA technical memorandum, 2024 / NTRS 2025)

- **著者:** Ralph Fritsche et al.
- **資料:** NASA/TM-20250001897（NTRS登録2025年、資料上の発表日2024年7月）
- **公式:** https://ntrs.nasa.gov/citations/20250001897
- **根拠の種類:** NASA技術メモ・栽培システムの検討（査読付き雑誌論文とは別）。
- **内容:** 長期宇宙飛行向け食品の保存性、栽培装置に必要な電力・水・乗員作業時間・食品安全などの制約。
- **Dr. Hematite:** 「温室を作れば即完全自給」ではなく、食料の補完から栽培拡張へというゲーム成長。

### [P12] Mars Surface Power Technology Decision (2024)

- **発行:** NASA, 2024 Moon to Mars Architecture（ホワイトペーパー）
- **原文:** https://www.nasa.gov/wp-content/uploads/2024/12/acr24-mars-surface-power-decision.pdf
- **根拠の種類:** NASAのミッション設計方針を述べた政策・技術判断資料（査読論文ではない）。
- **内容:** 初期有人火星計画の主電源として核分裂発電を選ぶ方針を説明。砂嵐・夜間における供給継続性を重視。
- **Dr. Hematite:** 電源の冗長化・停電・太陽光依存のリスク。主電源と予備電源を区別する。

## 4. レゴリス・鉄・3Dプリント・バイオプラスチック

### [P13] Metals Extraction on Mars Through Carbothermic Reduction (2022)

- **掲載:** *Acta Astronautica*, 198, 564–576 (2022)
- **DOI:** https://doi.org/10.1016/j.actaastro.2022.07.009
- **論文:** https://www.sciencedirect.com/science/article/pii/S0094576522003460
- **根拠の種類:** 査読論文・工業プロセスの熱力学計算／設計検討。
- **内容:** 火星レゴリスから炭素熱還元により鉄を得る経路を検討。炭素原料の取得も製造システムの一部として評価。
- **Dr. Hematite:** ヘマタイト→金属加工→工具・部品の技術ツリー。
- **注意:** この論文の主題は **carbothermic（炭素熱還元）**。ロードマップで示した `Fe₂O₃ + 3H₂ → 2Fe + 3H₂O` は水素還元という**別の反応経路**であり、混同しない。

### [P14] 3D Printing of Composites of Martian Regolith Simulants and Cyanobacterial Biomass Towards Sustainable Material Production on Mars (2025)

- **著者:** Sophia Mannes Guesser De Oliveira, Kurosch Rezwan, Cyprien Verseux, Michael Maas
- **掲載:** *npj Microgravity*, 11, 60 (2025)
- **DOI:** https://doi.org/10.1038/s41526-025-00521-9
- **オープン全文:** https://www.nature.com/articles/s41526-025-00521-9
- **根拠の種類:** 査読論文・**地球上**での火星模擬レゴリスと生物由来材料による3D印刷実験。
- **内容:** 火星レゴリス模擬物とシアノバクテリア由来バイオマスの複合材料を作り、ダイレクトインクライティング（DIW）で造形。
- **Dr. Hematite:** レゴリスと生物材料を組み合わせる素材研究、3Dプリンタの材料開発ツリー。
- **注意:** 「火星で採掘して製造した実績」ではない。一般的な樹脂フィラメント方式の3Dプリンタとも加工方式が異なる。

### [P15] Mars Seed: A Reference Architecture for Biomanufacturing Habitats from Martian Resources (2026)

- **著者:** Devon A. Stork et al.
- **公開:** arXiv, 2026年11月9日
- **識別子:** arXiv:2611.13064
- **原文:** https://arxiv.org/abs/2611.13064
- **根拠の種類:** **査読前プレプリント**・火星資源からPHBバイオプラスチックを得る装置群の**システム設計・計算評価**。
- **内容:** 火星のCO₂・氷・レゴリスを原料とし、電気化学的変換・微生物培養・材料精製を統合する構想。
- **Dr. Hematite:** 後半の技術枝 `CO₂ → 化学原料 → 微生物 → PHB → 成形材料`。
- **注意:** 火星で実装された技術ではない。3Dプリンタ用フィラメントとしての使用も、材質特性・添加剤・成形条件の検討が必要。

### [P16] A Closed-loop In Situ Biomanufacturing Approach for Bioplastic Production Using Coupled Anaerobic-Aerobic Bioreactor Technologies During Deep-space Operations (2026)

- **掲載:** *Space Habitation*, 2(3), 100068 (2026)
- **DOI:** https://doi.org/10.1016/j.spaceh.2026.100068
- **論文:** https://www.sciencedirect.com/science/article/pii/S2950616626000185
- **根拠の種類:** 査読誌掲載の**モデル・提案研究**。
- **内容:** 宇宙飛行士の食べ残しや排泄物を、嫌気・好気のバイオリアクターを経てPHBプラスチック原料に変える閉ループ工程を提案。
- **Dr. Hematite:** 廃棄物リサイクル→化学資源→バイオプラスチックという循環経済。
- **注意:** 施設の火星での実証・実生産量と混同しない。

## 5. 放射線・食料生産

### [P17] Mars’ Surface Radiation Environment Measured with the Mars Science Laboratory’s Curiosity Rover (2014)

- **著者:** Donald M. Hassler et al.
- **掲載:** *Science*, 343, 1244797 (2014)
- **DOI:** https://doi.org/10.1126/science.1244797
- **論文情報:** https://pubmed.ncbi.nlm.nih.gov/24324275/
- **根拠の種類:** 査読論文・火星表面における放射線の**現地観測**。
- **内容:** Curiosity搭載RADが測定した火星表面の放射線環境を報告。
- **Dr. Hematite:** 放射線警報イベント、避難、遮蔽材研究、屋外活動の中止などの意思決定。
- **注意:** ゲームの被ばくダメージを、検出値から単純な割合で換算しない。

### [P18] Modeling the Variations of Dose Rate Measured by RAD During the First MSL Martian Year: 2012–2014 (2015)

- **著者:** Jingnan Guo et al.
- **掲載:** *The Astrophysical Journal*, 810, 24 (2015)
- **DOI:** https://doi.org/10.1088/0004-637X/810/1/24
- **根拠の種類:** 査読論文・RAD観測と放射線環境の変動に関する解析。
- **内容:** 火星の気圧、季節変化、太陽活動などが表面の放射線線量率に影響する仕組みをモデル化。
- **Dr. Hematite:** 放射線イベント、地形・時間・防護によって変わるリスクの高度な表現。

---

## 6. NASA/ESA の実データマップと技術資料

論文ではない公式一次資料。図面をスライドに使用する場合は必ず元画像のクレジットと凡例を確認すること。

### 資源マップ（図の参照先）

| ID | 対象 | 公式ページ | ゲームでの役割 |
|---|---|---|---|
| M1 | SWIM地下氷候補地（PIA26045） | https://www.jpl.nasa.gov/images/pia26045-swim-map-shows-subsurface-water-ice-on-mars/ | 着陸地点と氷探査候補 |
| M2 | 地下氷候補（PIA26046） | https://www.jpl.nasa.gov/images/pia26046-distribution-of-buried-ice-on-mars/ | 氷の深さ・試掘候補 |
| M3 | Fe元素の相対分布（PIA04253） | https://science.nasa.gov/photojournal/map-of-martian-iron-at-mid-latitudes/ | 元素レイヤー。鉱石の確定地図ではない |
| M4 | Si元素の相対分布（PIA04256） | https://science.nasa.gov/photojournal/map-of-martian-silicon-at-mid-latitudes/ | 元素レイヤー。高純度シリカ採掘量ではない |
| M5 | ヘマタイトに富む領域（PIA05154） | https://science.nasa.gov/photojournal/targeting-a-hematite-rich-terrain/ | Dr. Hematiteの鉱物分析教材 |
| M6 | ヘマタイト（PIA02056） | https://science.nasa.gov/photojournal/hematite-map-tes/ | 鉱物分布の教材 |
| M7 | 含水鉱物マップ（ESA OMEGA / NASA CRISM） | https://www.esa.int/ESA_Multimedia/Images/2022/08/Global_map_of_hydrated_minerals_on_Mars | 粘土・硫酸塩・炭酸塩の候補 |
| M8 | 火星全球地質図（USGS SIM3292） | https://pubs.usgs.gov/sim/3292/ | 地形・地質単元の背景 |

### 生命維持・製造・ミッションの資料

| 資料 | 公式リンク | 用途 |
|---|---|---|
| NASA ECLSS | https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/ | 水再生・酸素生成・生命維持 |
| NASA: ISS Water Recovery Milestone (2023) | https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/ | 高い水回収率の**ISS**実証例 |
| NASA MOXIE mission results (2023) | https://www.nasa.gov/solar-system/nasas-oxygen-generating-experiment-moxie-completes-mars-mission/ | CO₂からO₂を製造する火星実証 |
| NASA 3D Printing / Refabricator | https://www.nasa.gov/missions/station/solving-the-challenges-of-long-duration-space-flight-with-3d-printing/ | 持ち込み樹脂の再利用・部品製造研究 |
| NASA ISRU | https://www.nasa.gov/overview-in-situ-resource-utilization/ | 現地資源利用の背景 |
| NASA Veggie / Space Crops | https://www.nasa.gov/missions/station/iss-research/growing-plants-in-space/ | 栽培と食料補給 |
| SWIM Project | https://swim.psi.edu/ | 地下氷の研究・データ |
| JMARS | https://jmars.asu.edu/ | 火星地質・鉱物データレイヤー |
| NASA PDS | https://pds.nasa.gov/ | 火星探査観測データの検索 |

## 7. 科学ロードマップとの対応

| 発明・ゲーム機能 | 主な裏付け | 観測・実証の段階 |
|---|---|---|
| 宇宙船の持ち込み資源・装置 | P01, P02, NASA ECLSS | 将来設計＋既存宇宙船技術 |
| 地下氷の探索・採掘 | P03, P04, M1, M2 | 地下氷の推定・探査候補。採掘量は未確定 |
| 水の精製・再生 | P02, NASA ECLSS, ISS water recovery | 宇宙ステーションでの実績。火星での性能は未実証 |
| 火星CO₂からO₂製造 | P09, P10, MOXIE | 火星での小型装置実証 |
| 水の電気分解とH₂利用 | NASA ECLSS, P01, P02 | 宇宙船技術・反応原理 |
| ヘマタイト・鉄の技術 | M3, M5, P13 | 鉱物分布観測＋地球での金属抽出プロセスの設計 |
| セラミック・レゴリス3Dプリント | P14, M7 | 地球上の模擬材料で実験 |
| 樹脂リサイクルと3Dプリント | NASA Refabricator | 宇宙での研究。ただし技術実証の達成度には制約あり |
| CO₂ → PHBバイオプラスチック | P15 | システム設計・プレプリント（火星実証なし） |
| 有機廃棄物 → PHB | P16 | 将来のバイオリアクターモデル |
| 栽培・食料生産 | P11, NASA Veggie | ISSで栽培実験。完全自給は未実証 |
| 放射線イベント・遮蔽 | P17, P18 | 火星表面の観測＋リスクモデル |
| 塩類・硫酸塩の分析 | P06, P07, P08 | 鉱物分布の観測と研究 |
| 基地の電力システム | P12 | NASAの将来ミッション向け設計方針 |

### 基本となる化学反応（教材・ゲームの簡略化表記）

- 水の電気分解: `2H₂O → 2H₂ + O₂`
- CO₂の固体酸化物電解: `2CO₂ → 2CO + O₂`
- サバティエ反応: `CO₂ + 4H₂ → CH₄ + 2H₂O`
- 水素による酸化鉄還元: `Fe₂O₃ + 3H₂ → 2Fe + 3H₂O`

いずれも触媒・温度・圧力・純度・電力などの条件が重要。生産装置が完成しただけで、無条件に無限量の資源が増えるわけではない。

## 8. NotebookLM / Codex 利用メモ

1. このMarkdownと、以前作成した **Science Invention Roadmap** および **Materials & 3D Printing Roadmap** のPDFを一緒に追加する。
2. NASAマップについては元ページ・オリジナル画像を別途取得して、出典付きで表示する。AIが描いた架空マップを観測マップとして提出しない。
3. `Observed / Demonstrated / Earth Experiment / Model or Proposal / Game Assumption` の5段階で出典タグを持つ。
4. スライドの本編では論文を長々と並べず、使った科学データとゲーム判断の関係を図示し、詳細文献はAppendixで提示。
5. 出典のリンクと発行年は取得時点で確認済みだが、正式な転載権や利用規約は個別に確認する。
6. NASA Space Apps課題名: [Build a Junior Astronaut Mission Trainer](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/)。課題自体は査読論文ではないため、文献欄とは別に提示。

---

**Memo:** このリストは会話で扱った文献を中心に、関連性が高く正式書誌情報を確認できた技術・科学資料を補ったものです。文献へのリンク集・要旨ガイドであり、各論文の本文や図表そのものを再配布するものではありません。
