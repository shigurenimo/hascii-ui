---
name: software-design
description: "?"
user-invocable: false
disable-model-invocation: false
metadata:
  author: shigurenimo
  description: 製品設計・UI 設計・ドメイン設計・コード設計をカバーする設計指針スキル。
  dev: true
  tags: [docs]
---

> このスキルを更新するときは [README.md](README.md) の方針に従う。

# Product Design

Jesse James Garrett's UX 5 planes (Strategy, Scope). Ref: [ux-five-planes.md](references/ux-five-planes.md)

利用者・体験・市場を扱う。製品の外側。

- JTBD: 機能の前に「顧客が雇うジョブ」を特定する
- シナリオ: 「クリックする」でなく「迷う／安心する」を書く

# UI Design

OOUI + Jesse James Garrett's UX 5 planes (Structure, Skeleton, Surface). Ref: [ux-five-planes.md](references/ux-five-planes.md)

利用者と接する境界。画面とインタラクション。

## OOUI

- 名詞→動詞: 対象を選んでから操作を選ぶ。タスク（動詞）起点で組まない
- メニュー項目は名詞で書く（「登録する」でなく「利用者」）
- オブジェクトごとに一覧ビューと詳細ビューを用意する
- モードレス: 線形フロー強制禁止、複数経路で到達できるようにする
- 構造はタスクでなくオブジェクトで作る（タスクは変わる、オブジェクトは残る）

## 画面順

- 操作順でなく、不安を解消する順に並べる

# Domain Design

Eric Evans's DDD (Strategic): aggregate, invariant, boundary.

中核の業務概念。実装パターンは Code Design に置く。

## 集約と不変条件

- 集約: 整合性を保つオブジェクトの一塊
- 不変条件: 集約境界で常に守るルール
- 集約ルートは不変条件ごとに分ける
- 不変条件を持つロジックは Domain 層として独立させる

## Entity と Value Object

- Entity: 同一性（ID）を持つ概念
- Value Object: 値そのもの。同一性を持たない
- 実装パターンは Code Design を参照

# Code Design

Kent Beck's Simple Design: passes tests, reveals intent, no duplication, fewest elements.

実装すべて。UI とドメインを繋ぐコードもここで扱う。

## 型の誠実さ

- `as unknown as T` や `any` を使いたくなったら設計の歪み
- 型の不整合・責務の重複・境界の引き方を直す
- 抽象化（interface、抽象クラス）を作らない。具体クラスを直接使う
- TypeScript の `interface` 構文は使わない。`type` で表す

## 構造の選択

- 入力→出力だけ ⇒ 関数
- 設定を保持し複数操作で共有（API クライアント、DB 接続）⇒ クラス
- 不変データの集まり・ロジック不要 ⇒ type
- 引数 4 超 ⇒ Builder またはオブジェクト引数

## Entity の実装

- イミュータブル（Object.freeze）
- 状態変更は `with*()` で新しいインスタンスを返す
- フラットに保つ。他の Entity を入れ子にしない

## Value Object の実装

- バリデーション付きの値（Zod + Object.freeze）
- 判定ロジックは getter
- 複数値の更新は `with*()` で新しいインスタンスを返す

詳細 ⇒ [value-object.md](references/value-object.md)

## レイヤードアーキテクチャ

依存方向は Interface → Application → Domain → Infrastructure の一方向。逆転させない。

- 単純な CRUD ⇒ 直接実装、層を分けない
- 複数処理が関連 or 2 箇所以上で同じロジック ⇒ Service 層
- DI コンテナ禁止。コンストラクタ注入のみ
- DB 接続・API キーは環境変数で受け、トップレベルで具体クラスを生成して下位層に渡す（バケツリレー）
- 判断軸: モックなしでテストできるか

詳細 ⇒ [architecture.md](references/architecture.md)

## パターン

- 変換チェーン ⇒ [Fluent API](references/fluent-api.md)
- 複数リソース調整（3 つ以上）⇒ [Service Layer](references/service-layer.md)
- API 簡略化 ⇒ Facade
- 状態遷移 ⇒ [FSM](references/fsm.md)
- 型レベルの状態区別・単位混同防止・バリデーション前後 ⇒ [Phantom Type](references/phantom-type.md)
- 生成パターンが複数 ⇒ Factory Method
- 外部インターフェース変換 ⇒ Adapter（具体クラス）
- UI 非同期状態（ブラウザ／CLI）⇒ [Reducer](references/reducer.md)（バックエンド禁止）

## エラーハンドリング

- バックエンド: throw しない。`T | Error` を戻す。`instanceof` で判別
- フロントエンド: ErrorBoundary

詳細 ⇒ [error-handling.md](references/error-handling.md)

## TypeScript 読み替え

Kent Beck の Implementation Patterns ⇒ TypeScript：

- クラス継承 ⇒ Union 型 + exhaustive switch
- インターフェース構文 ⇒ type + 関数
- Method Object ⇒ クロージャ or オブジェクト引数
- Collection wrapper ⇒ ReadonlyArray + ユーティリティ関数

## React

詳細 ⇒ [react.md](references/react.md)
