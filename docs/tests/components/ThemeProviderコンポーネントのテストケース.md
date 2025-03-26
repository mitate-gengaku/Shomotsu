# ThemeProviderコンポーネント
## コンポーネントが正常に表示される
### テストケース: TPC-001
**期待結果**:
コンポーネントが正常に表示される

**テスト項目**
- コンポーネントが正常に表示される
  - [x] 子コンポーネントが正常に表示される
  - [x] デフォルトのテーマは"light"

## darkモードのとき、ThemeProviderにdarkが正しく渡される
### テストケース: TPC-002
**期待結果**
darkモードのとき、ThemeProviderにdarkが正しく渡される

**テスト項目**
- darkモードのとき、ThemeProviderにdarkが正しく渡されること
  - [x] ダークモードのとき、Providerにdarkが渡される

## systemモードのとき、ThemeProviderにsystemが正しく渡される
### テストケース: TPC-003
**期待結果**
systemモードのとき、ThemeProviderにsystemが正しく渡される

**テスト項目**
- systemモードのとき、ThemeProviderにsystemが正しく渡される
  - [x] システムモードのとき、Providerにsystemが渡される