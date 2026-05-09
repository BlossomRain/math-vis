# 数学可视化系统

基于 React + TypeScript + Vite 的交互式数学可视化平台。

## 功能特性

- **2D 函数可视化**：支持数学表达式绘制、参数交互
- **章节化内容组织**：函数、微积分、线性代数等数学主题
- **全局配置系统**：线宽、颜色、网格等样式统一配置
- **配置导入导出**：JSON 格式，支持分享和保存

## 技术栈

- React 18 + TypeScript
- Vite
- mathjs（数学表达式计算）
- Canvas 2D 渲染

## 项目结构

```
src/
├── components/          # UI 组件
│   ├── Canvas2D.tsx    # 2D 画布
│   ├── Sidebar.tsx     # 侧边栏导航
│   ├── MenuBar.tsx     # 顶部菜单
│   └── GlobalConfigPanel.tsx  # 全局配置面板
├── data/
│   ├── books/          # 按科目组织的章节内容
│   │   ├── functions/  # 函数与图像
│   │   ├── calculus/   # 微积分
│   │   └── linear-algebra/  # 线性代数
│   ├── chapters.ts     # 章节数据聚合
│   ├── theme.ts        # 主题配置
│   └── globalConfig.ts # 全局配置管理
├── types/              # TypeScript 类型定义
└── App.tsx             # 应用入口
```

## 开发进度

| 阶段 | 内容 | 状态 |
|------|------|------|
| 阶段1 | MVP 核心功能（2D画布、函数绘制、参数控制） | ✅ 完成 |
| 阶段2 | 统一场景体系（章节导航、多页面、配置导入导出） | ✅ 完成 |
| 阶段2.5 | 架构重构与全局配置系统 | ✅ 完成 |
| 阶段3 | 3D 可视化能力 | ⏳ 待开发 |
| 阶段4 | 动画与课程系统 | ⏳ 待开发 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

Windows 环境可直接运行：
```powershell
.\start.sh
```

## 详细文档

- [项目方案](./doc/项目方案.md)
- [实施规划](./doc/实施规划.md)

## Hub Entry

This tool project is managed through the workspace hub:

D:\workspace\workspace-hub\projects\math-vis\README.md

Use the hub view as the workspace-level entry for project context, references, and future shared links.
