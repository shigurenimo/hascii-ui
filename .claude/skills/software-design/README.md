# software-design

設計判断のときに採用する手法と考え方を集めたスキル。

## 体系

4 つの根を立てる。外側（利用者）から内側（実装）に向かう同心円構造。各根は提唱者の体系を借りる。

- Product Design — 利用者・体験・市場。Jesse James Garrett の UX 5 planes（戦略・要件）
- UI Design — 利用者と接する境界。OOUI と Garrett の UX 5 planes（構造・骨格・表層）
- Domain Design — 中核の業務概念。Eric Evans の DDD（Strategic のみ、概念モデル）
- Code Design — 実装すべて。Kent Beck の Simple Design ＋ Layered Architecture

SKILL.md は H1 を 4 つ並べ、それぞれ冒頭で根を宣言する。Tactical DDD（Aggregate 実装、Entity、Value Object の実装パターン）は Code Design 配下に置く。

## 方針

- 採用した手法だけを書く。代替案や比較は書かない（線路を敷く）
- 同じ観点に競合する手法を並べない。競合しない手法であればいくつでも追加していく
- 実行順序やワークフローは書かない
- 分類されていれば、どのフェーズでどれを参照するかは Claude が判断する
- 採用したものは厳守。判断基準であると同時に、設計やコードの適合検査にも使う
- より良い手法が見つかれば差し替える

## 含めないもの

- コーディング規約
- 文章の書き方・フォーマット
- 運用・書き方のルール
- テスト戦略、検証ループ、可観測性、改善（設計の外）
