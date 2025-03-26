# useAppearanceフック
## useAppearanceフックは正しい初期値を返す
### テストケース: UARH-001
**期待結果**:
useAppearanceフックは正しい初期値を返す

**テスト項目**
- useAppearanceフックは正しい初期値を返すこと
  - [x] themeの初期値は"light"
  - [x] checkedの初期値はfalse
  - [x] onCheckSyncSettingは関数である
  - [x] onCheckCardは関数である

## onCheckSyncSettingがcheckedを反転させ、checkedの状態に基づいてテーマを変更する
### テストケース: UARH-002
**期待結果**:
onCheckSyncSettingがcheckedを反転させ、checkedの状態に基づいてテーマを変更する

**テスト項目**
- onCheckSyncSettingがcheckedを反転させ、checkedの状態に基づいてテーマを変更すること
  - [x] onCheckSyncSettingを呼び出すとcheckedが反転し、trueになる
  - [x] checkedがtrueのとき、themeは"system"に設定される
  - [x] checkedがfalseのとき、themeは"light"に設定される

## onCheckCardはcheckedがfalseの場合のみテーマを変更する
### テストケース: UARH-003
**期待結果**:
onCheckCardはcheckedがfalseの場合のみテーマを変更する

**テスト項目**
- onCheckCardはcheckedがfalseの場合のみテーマを変更すること
  - [x] checkedがfalseのとき、ライトモードの場合はダークモードに変更できる
  - [x] checkedがfalseのとき、ダークモードの場合はライトモードに変更できる