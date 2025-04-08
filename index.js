import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { createInterface } from "readline";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * 生成指定数量的以太坊钱包
 * @param {number} count - 要生成的钱包数量，默认为1
 * @returns {Promise<Array>} 返回生成的钱包信息数组
 */
async function generateWallets(count = 1) {
  try {
    // 初始化存储数组
    const wallets = [];      // 存储完整的钱包信息
    const addresses = [];    // 存储钱包地址
    const privateKeys = [];  // 存储私钥
    const mnemonics = [];    // 存储助记词

    // 循环生成指定数量的钱包
    for (let i = 0; i < count; i++) {
      // 使用ethers库生成随机钱包
      const wallet = ethers.Wallet.createRandom();

      // 构建钱包信息对象
      const walletInfo = {
        address: wallet.address,      // 钱包地址
        privateKey: wallet.privateKey,  // 私钥
        mnemonic: wallet.mnemonic.phrase,  // 助记词
      };
      wallets.push(walletInfo);
      
      // 将各类信息分别存储到对应的数组中
      addresses.push(wallet.address);
      privateKeys.push(wallet.privateKey);
      mnemonics.push(wallet.mnemonic.phrase);
    }

    // 保存完整的钱包信息到JSON文件
    const savePath = path.join(__dirname, "wallets.json");
    fs.writeFileSync(savePath, JSON.stringify(wallets, null, 2));

    // 将不同类型的信息分别保存到独立的文本文件中
    // 每个文件中的信息都是一行一个，没有额外的标点符号
    fs.writeFileSync(path.join(__dirname, "addresses.txt"), addresses.join("\n"));
    fs.writeFileSync(path.join(__dirname, "privateKeys.txt"), privateKeys.join("\n"));
    fs.writeFileSync(path.join(__dirname, "mnemonics.txt"), mnemonics.join("\n"));

    // 输出生成结果信息
    console.log(`成功生成 ${count} 个钱包`);
    console.log("完整信息已保存至 wallets.json");
    console.log("地址已保存至 addresses.txt");
    console.log("私钥已保存至 privateKeys.txt");
    console.log("助记词已保存至 mnemonics.txt");
    return wallets;
  } catch (error) {
    console.error("生成钱包时出错:", error);
    throw error;
  }
}

/**
 * 获取用户输入的钱包生成数量
 * @returns {Promise<string>} 返回用户输入的数量
 */
const generateTotal = () => {
  return new Promise((resolve) => {
    readline.question(chalk.yellow("请输入要生成的钱包数量: "), resolve);
  });
};

/**
 * 主函数：程序入口
 * 处理用户输入并生成钱包
 */
const index = async () => {
  // 获取用户输入的数量，如果输入为空则默认为1
  const total = (await generateTotal()) || 1;
  
  // 验证输入是否为有效数字
  if (isNaN(total)) {
    console.error("请输入数字");
    return;
  }
  
  // 生成钱包并关闭命令行交互
  await generateWallets(Number(total));
  readline.close();
};

// 启动程序
index();
