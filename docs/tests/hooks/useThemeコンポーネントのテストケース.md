# useThemeフック
## useThemeはonChangeTheme関数を返す
### テストケース: UTH-001
**期待結果**:
useThemeはonChangeTheme関数を返す

**テスト項目**
- useThemeはonChangeTheme関数を返すこと
  - [x] onChangeTheme関数が含まれている
  - [x] onChangeThemeの型はfunctionである


### テストケース: UTH-002
**期待結果**
onChangeThemeを呼び出すとき、正しい値がsetThemeに渡される

**テスト項目**
- onChangeThemeを呼び出すとき、正しい値がsetThemeに渡されること
  - [ ] onChangeThemeにlightを渡すと、内部のsetThemeに"light"を引数にとり、実行される
  - [ ] onChangeThemeにsystemを渡すと、内部のsetThemeに"system"を引数にとり、実行される