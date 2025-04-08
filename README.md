# 以太坊钱包批量生成工具

这是一个简单的命令行工具，用于批量生成以太坊钱包。每个生成的钱包都包含地址、私钥和助记词，并将这些信息分别保存到不同的文件中。
推特：https://x.com/2025_go?s=21

## 功能特点

- 支持批量生成任意数量的以太坊钱包
- 自动保存钱包信息到多个文件：
  - `wallets.json`: 包含所有钱包的完整信息
  - `addresses.txt`: 每行一个钱包地址
  - `privateKeys.txt`: 每行一个私钥
  - `mnemonics.txt`: 每行一个助记词
- 命令行交互界面，使用简单
- 支持错误处理和输入验证

## 安装要求

- Node.js (推荐 v14 或更高版本)
- npm 或 yarn 包管理器

## 安装步骤

1. 克隆或下载本项目到本地
2. 进入项目目录
3. 安装依赖包：

```bash
npm install
# 或者使用 yarn
yarn install
```

## 使用方法

1. 运行脚本：

```bash
node index.js
```

2. 根据提示输入要生成的钱包数量
3. 程序会自动生成钱包并将信息保存到以下文件：
   - `wallets.json`: 包含所有钱包的完整信息（JSON格式）
   - `addresses.txt`: 仅包含钱包地址，每行一个
   - `privateKeys.txt`: 仅包含私钥，每行一个
   - `mnemonics.txt`: 仅包含助记词，每行一个

## 文件格式说明

### wallets.json
```json
[
  {
    "address": "0x...",
    "privateKey": "0x...",
    "mnemonic": "word1 word2 ..."
  },
  ...
]
```

### addresses.txt
```
0x1234...
0x5678...
```

### privateKeys.txt
```
0xabcd...
0xefgh...
```

### mnemonics.txt
```
word1 word2 word3 ...
word4 word5 word6 ...
```

## 注意事项

- 请妥善保管生成的钱包信息，特别是私钥和助记词
- 建议在离线环境下使用此工具
- 生成的文件会保存在脚本所在的目录中
- 如果文件已存在，会被覆盖

## 依赖包

- ethers: 以太坊工具库
- chalk: 终端文字颜色美化
- readline: 命令行交互
- fs: 文件系统操作
- path: 路径处理

## 许可证

MIT 