# 部署到 GitHub Pages

本文档介绍如何将数学可视化系统部署到 GitHub Pages。

## 前置条件

1. 项目已推送到 GitHub 仓库
2. 有仓库的写权限

## 部署步骤

### 1. 安装 gh-pages 依赖

```bash
npm install --save-dev gh-pages
```

### 2. 修改 package.json

添加以下字段：

```json
{
  "homepage": "https://<你的用户名>.github.io/<仓库名>",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

示例：
```json
{
  "homepage": "https://tom.github.io/math-vis",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. 修改 vite.config.ts

添加 base 配置：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<仓库名>/',  // 例如：'/math-vis/'
})
```

### 4. 执行部署

```bash
npm run deploy
```

该命令会：
1. 执行 `npm run build` 构建项目
2. 将 `dist` 目录推送到 `gh-pages` 分支

### 5. 配置 GitHub Pages

1. 打开 GitHub 仓库页面
2. 进入 Settings → Pages
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "gh-pages"，文件夹选择 "/ (root)"
5. 点击 Save

等待几分钟后，访问 `https://<你的用户名>.github.io/<仓库名>` 即可。

## 自动部署（GitHub Actions）

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

推送后，每次提交到 main 分支会自动触发部署。

## 常见问题

### 1. 页面空白

检查 `vite.config.ts` 中的 `base` 配置是否正确，应与仓库名一致。

### 2. 资源 404

确保所有资源路径使用相对路径，vite 构建时会自动处理。

### 3. 部署后样式丢失

检查 `index.html` 中的资源引用是否为相对路径。

## 验证部署

访问 `https://<用户名>.github.io/<仓库名>`，应能看到应用正常运行。
