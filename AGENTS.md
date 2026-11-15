# AGENTS.md — Dr. Hematite 共通文脈

## 企画の核

NASAの実際の火星データから資源を探し、化学・素材・発明ロードマップを開拓し、有限の生命維持資源と予期せぬ事故を乗り越える教育ゲーム。小学生高学年〜高校生を想定し、直感的で説明書なしでも遊べるUIを志向する。

## 読んでほしい順番

1. [README.md](README.md) と [現在地](docs/CURRENT_STATE.md)
   - UIUX・研究・教材の改修は [Task2.md](Task2.md)、科学データとゲーム機能の残作業は [Task.md](Task.md) の依存関係・実装範囲・完了条件を参照する。
2. [NASA_RESOURCE_MAPS.md](docs/science/NASA_RESOURCE_MAPS.md)（最重要）
3. [SCIENCE_ROADMAP.md](docs/science/SCIENCE_ROADMAP.md)（最重要）
4. [NASA_CHALLENGE_JUDGING.md](docs/submission/NASA_CHALLENGE_JUDGING.md)
5. [新しい対戦試作](game/README.md) と [仮の規則](game/RULES.md)。旧案は [MARS_POLYTOPIA.md](docs/design/MARS_POLYTOPIA.md)、過去の比較は [GAMEPLAY_THREE_OPTIONS.md](docs/design/GAMEPLAY_THREE_OPTIONS.md)、体験の核は [GAME_CONCEPT.md](docs/design/GAME_CONCEPT.md)
6. [決定記録](docs/DECISIONS.md) と、必要に応じて他の `docs/`・`assets/`。

## 判断の置き方

- 最新の作業指示は、UIUX改修の作業を [Task2.md](Task2.md) にまとめること。操作できる研究ツリーから横向きのイラスト教材・動画へつなぐ。資源を水・電気だけで捉えず、共通のイラストで示す。ゲーム本体の縦横は同じ戦況で比較して決める。横向きはAstraの候補であり確定していない。「まずAstraで思考、Solで開発」の分担を引き継ぐ。
- 現行は[実地図の2陣営対戦試作](game/index.html)。実地図、モバイル、文明発展で相手を倒す目標、戦闘中の砂嵐・放射線イベントを重視する。試作の数値・仕様は固定せず、ゲーム機能の未完了項目は[Task.md](Task.md)で追う。

- 既に共有した企画の核と、数値・システム案などの未決定事項を区別する。
- NASA観測・観測に基づく推定・実証済み技術・モデル研究・ゲーム上の抽象化を区別する。
- 科学の面白さ、遊びの緊張感、学びやすさを並行して考える。
- 地図を主画面、研究を別ページにする。Dr.STONE的な文明の進化と火星素材からの製作を維持する。現在は[新しい対戦試作](game/index.html)を検証し、[旧操作試作](prototype/index.html)とゲーム性の3案は比較の履歴として扱う。
- ユーザーはDr.STONE的な素材・発明・文明の連鎖と大きな研究ロードマップを明確に維持したい。最初の砂嵐を導入にし、その後はよりランダムなミッションを考える。科学の幅を縮めず、複雑な内容をシンプルに見せる。
- チュートリアルなどで情報を小出しにする案が出ている。短い道筋から枝と系統間のつながりを徐々に見せる設計を検討する。具体的な研究順、経済、時間の進行方式、数値は未決定。
- 実装の分担はゲームの方向と作業量に応じて決める。4 Agentsは必要時の選択肢で、常時使用を前提としない。

## 資料の扱い方

- 現在の段階と検討の焦点は `docs/CURRENT_STATE.md`、共有済みの核と判断の履歴は `docs/DECISIONS.md` を参照する。
- アイデアや仮値は候補として記載し、決定として残すときは根拠・理由・影響する資料を添える。ユーザーの新しい指示を優先する。
- 科学の根拠は `docs/science/`、ゲーム案は `docs/design/`、提出条件は `docs/submission/` に記載する。関連する説明は複製よりリンクを使う。
- `assets/roadmaps/` は教育用コンセプト画像。工程の科学的条件は `docs/science/` の文章と出典で確認する。
- `_archive/` は整理前の保存用。通常の資料読み込みでは現行の `docs/` を使う。
- ファイルを移動したら、README・関連資料・スクリプト内の参照先も更新する。
