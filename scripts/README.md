向量化批次轉換（遞迴）

需求套件（開發環境）:

- `sharp` — 讀取 `.heic/.jpg/.png` 並轉成位圖 buffer
- `potrace` — 把位圖追蹤成 SVG

安裝（使用 pnpm 範例）:

```bash
pnpm add -D sharp potrace
```

注意：`sharp` 會下載對應平台的 libvips 二進位，若在 CI/特定環境須確認網路或使用系統套件安裝方式。

用途：

- 腳本會遞迴掃描 `src/assests`（預設）或 `--input=PATH` 指定的資料夾，尋找 `.jpg`、`.jpeg`、`.png`、`.heic` 檔，
	並將每個檔位圖追蹤成同名 `.svg`，輸出放回原始檔案的同一資料夾中（保留檔名前綴）。

用法範例：

```bash
# 使用預設路徑（專案內的 src/assests）
node scripts/heic-to-svg.js

# 或指定輸入資料夾
node scripts/heic-to-svg.js --input=path/to/your/images
```

輸出：同資料夾中的 `example.jpg` 會產生 `example.svg`。

建議：

- 向量化對於照片或細節非常多的圖片，結果可能不理想；若要微調，可以先在 `sharp` 加入縮放或在 `potrace` 選項調整門檻（目前腳本使用預設設定）。

如果執行時遇到錯誤，請把錯誤訊息貼上來，我會協助排查。
