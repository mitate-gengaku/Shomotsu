# Shomotsu

## サイトURL
[https://shomotsu.net](https://shomotsu.net)

## 目次
1. [プロジェクトについて](#プロジェクトについて)
2. [技術スタック](#技術スタック)
3. [バージョン](#バージョン)
4. [ディレクトリ構成](#ディレクトリ構成)
5. [ER図](#ER図)
6. [環境の構築起動方法](#環境の構築起動方法)

## プロジェクトについて
## 技術スタック
### 言語
- TypeScript

### ライブラリ・フレームワーク
- React・Next.js
- shadcn/ui
- TailwindCSS
- Three.js
- react-three/fiber・react-three/drei

### テスト
- vitest
- playwright

### 認証
- Clerk

### ホスティング
- Vercel

### ストレージ
- 検討中

### データベース
- Neon・Postgresql

### アクセス解析
- Umami

### モニタリング
- Vercel Speed Insights

### Firewall
- Vercel Firewall

### IaC
- Terraform

## バージョン
## ディレクトリ構成
### feature内のディレクトリについて
以下の順に読み込んでいく
1. pages
2. client

1のファイル内でデータベース接続を行い、データを2に渡すContainer/Presentationalパターンを模した構成で実装しました。またpagesはapp/page.tsxから呼び出すことでルーティング責務と分離を図るようにしました。

## ER図
## 環境の構築・起動方法