# Dr. Hematite

NASAなどの火星観測データを手がかりに資源を探し、化学・素材の発明で基地を育てる教育ゲームです。現在はArcadia PlanitiaのHiRISE実測標高を使った、2陣営の対戦試作を制作しています。資源と中継Podを争いながら、水・酸素・食料を維持し、相手の中枢基地を攻略します。対象は小学校高学年から高校生です。

NASA Space Apps Challenge 2026「Build a Junior Astronaut Mission Trainer」向けの企画です。観測された地形と、ゲーム用に置いた局所資源・設備性能を区別しています。

## ゲームを開く

プロジェクトのルートで `node scripts/serve_game.js` を実行し、[日本語版](http://127.0.0.1:8765/game/?lang=ja)または[英語版](http://127.0.0.1:8765/game/?lang=en)を開いてください。ローカルサーバーが動いている間にアクセスできます。ビルドは不要です。

初期状態では氷採取場、採水設備、電解設備、温室、電源、蓄電設備が稼働しています。地図でPodと追加資源を確保し、本拠地で加工装置を増設します。水・酸素・食料の表示を押すと、生産量、加工と生活で使う量、残る量を確認できます。詳しい操作は[ゲームの案内](game/README.md)と[試作規則](game/RULES.md)を参照してください。

## 現在地と次の作業

- [現在地](docs/CURRENT_STATE.md)：動く機能、検証済みの範囲、未評価の点。
- [Task5](Task5.md)：地図の下部に生産中の資源を示し、研究ボタンを分かりやすくする次の作業。
- [初期生命維持と資源収支](docs/design/LIFE_SUPPORT_BALANCE.md)：水・酸素・食料、電力、Pod、素材の試作バランス。
- [確認記録](game/tests/PLAYTEST.md)：機能・画面・経済の検証結果。

## 科学資料と出典

- [NASA資源地図](docs/science/NASA_RESOURCE_MAPS.md)：観測から分かることと、ゲーム地図で仮定したこと。
- [科学・発明ロードマップ](docs/science/SCIENCE_ROADMAP.md)：氷から水・酸素・食料、鉱物から金属、樹脂から部品へ至る道筋。
- [地図の出典と加工](game/assets/sources.md)：HiRISE地形と画像の利用記録。
- [課題と審査](docs/submission/NASA_CHALLENGE_JUDGING.md)：提出先の課題と評価観点。
- [判断の履歴](docs/DECISIONS.md)：共有済みの方針と試作値の区別。

エージェント向けの共通文脈は[AGENTS.md](AGENTS.md)にあります。以前の構想と資料は `_archive/` に保存しています。
