# Flying-Engineer (飛翔泥水匠)

本專案為「飛翔泥水匠」官方網站，使用 React + Vite + TypeScript 建置。網站主體為 SPA，但為了搜尋引擎最佳化（SEO），在 `public/` 下建立了可被 Google 單獨索引的靜態在地 landing pages（keelung/taipei/newtaipei/taoyuan）。

## 技術棧

- React
- Vite
- TypeScript
- pnpm（建議使用）
- Google Analytics (gtag.js)
- JSON‑LD (LocalBusiness) for structured data

## 專案重點

- 靜態在地頁：放在 `public/keelung/`, `public/taipei/`, `public/newtaipei/`, `public/taoyuan/`，每頁含獨立 head meta、OG、JSON‑LD，方便直接被搜尋引擎抓取。
- sitemap 與 robots：`public/sitemap.xml` 與 `public/robots.txt` 已配置，並由 `scripts/generate-sitemap.js` 產生/更新。
- 關鍵字策略：已由關鍵字堆砌調整為聚焦四城（基隆/台北/新北/桃園）與主要服務字詞，相關設定在 `src/seo/keywords.ts`。

## 重要檔案

- [public/index.html](public/index.html) — 全站 head（meta / OG / JSON‑LD / gtag）
- [public/sitemap.xml](public/sitemap.xml)
- [public/robots.txt](public/robots.txt)
- [scripts/generate-sitemap.js](scripts/generate-sitemap.js)
- [public/keelung/index.html](public/keelung/index.html)
- [public/taipei/index.html](public/taipei/index.html)
- [public/newtaipei/index.html](public/newtaipei/index.html)
- [public/taoyuan/index.html](public/taoyuan/index.html)
- [src/seo/keywords.ts](src/seo/keywords.ts)
- [src/components/Footer.tsx](src/components/Footer.tsx)
- [src/components/Hero.tsx](src/components/Hero.tsx)

## 快速開始 (Local development)

環境需求：Node.js 18+、pnpm（或使用 npm/yarn，但 repo 使用 pnpm 為主）。

```bash
pnpm install
pnpm start       # 啟動 Vite 開發伺服器，請看終端列出的埠（預設 5173）
pnpm build       # 建置靜態檔案到 dist/
pnpm run preview # 若要預覽 build 的內容
```

若要（重新）產生 sitemap：

```bash
node scripts/generate-sitemap.js
# 會輸出或覆寫 public/sitemap.xml
```

本地檢查某個靜態頁是否可被抓取（示例）：

```bash
curl -I http://localhost:5173/keelung/
curl -I http://localhost:5173/taipei/
```

## SEO 與上線檢查要點

- 每個城市頁必須有獨特的 `title`、`meta description`、與單一主要 `h1`。避免不同城市頁使用完全相同的段落內容。
- canonical：若有相似內容，使用 `rel="canonical"` 指向主要頁面，而不是讓多個頁面相互競爭。
- noindex：若某頁不希望被收錄，請在該頁 `<head>` 加入：

```html
<meta name="robots" content="noindex, nofollow" />
```

（注意：不要用 `robots.txt` 來做 noindex，Google 不會把 noindex 放在 robots.txt 當作指令。）

- 結構化資料：每頁 head 含 LocalBusiness 的 JSON‑LD，並確認 `telephone`、`name`、`addressLocality` 等欄位一致。
- sitemap 與 robots：部署後在 Google Search Console 提交 `https://<YOUR_DOMAIN>/sitemap.xml`。

## 提交到 Google Search Console（簡短步驟）

1. 登入 Google Search Console，選擇或新增你的網站屬性（請使用正確的主域或子域）。
2. 到 Sitemaps，填入 `sitemap.xml` 的完整 URL，例如 `https://flying-engineer.com.tw/sitemap.xml`，按 Submit。
3. 針對重要的城市頁使用「URL 檢查」→ Request Indexing（若頁面被允許抓取）。

## 建議的下一步（優先順序）

1. 把首頁與 footer 加上指向四個在地頁的內部連結（增加發現與權重） — 編輯 `src/components/Footer.tsx` 與 `src/components/Hero.tsx`。
2. 登入 GSC 並提交 sitemap，確認沒有 `noindex` 或 robots 阻擋關鍵頁面。
3. 使用 Google 的 URL 檢查與 Rich Results Test 驗證 JSON‑LD。
4. 蒐集在地引用（Google 商家、在地目錄、評論），強化排名信號。

## 常見問題（FAQ）

- Q: 為何要把城市頁放在 `public/`？
  - A: 靜態頁直接放在 `public/` 可讓伺服器回傳獨立 HTML，搜尋引擎能立即抓取與索引，不受 SPA client-side 路由限制。

- Q: 我應該把哪些頁設為 `noindex`？
  - A: 感謝頁、測試頁、管理後台或明顯重複內容頁適合 noindex；若只是相似內容，優先考慮 canonical。

---

如果你要，我可以接著：

- 1. 幫你把首頁／Footer 加上到四個城市頁的內部連結；
- 2. 或幫你把 sitemap 提交到 Google Search Console（我會提供步驟或協助後續檢查）。

回覆你要我先執行哪一項，我就開始處理。
