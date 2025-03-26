# useThemeフック
## useThemeフックは正しい初期値を返す
### テストケース: UTH-001
**期待結果**:
useThemeフックは正しい初期値を返す

**テスト項目**
- useThemeフックは正しい初期値を返すこと
  - [x] onChangeTheme関数が含まれている
  - [x] onChangeThemeの型はfunctionである


## onChangeThemeを呼び出すとき、正しい値がsetThemeに渡される
### テストケース: UTH-002
**期待結果**
onChangeThemeを呼び出すとき、正しい値がsetThemeに渡される

**テスト項目**
- onChangeThemeを呼び出すとき、正しい値がsetThemeに渡されること
  - [ ] onChangeThemeにlightを渡すと、内部のsetThemeに"light"を引数にとり、実行される
  - [x] onChangeThemeにsystemを渡すと、内部のsetThemeに"system"を引数にとり、実行される