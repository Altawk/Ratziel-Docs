---
title: 安装指南
sidebar_position: 2
---

# 安装指南

## 系统要求

在安装Ratziel插件前，请确保您的服务器满足以下要求：

- **Minecraft版本**：1.13 及以上
- **服务端**：Paper/Spigot
- **Java版本**：Java 8 或更高
- **依赖插件**：TabooLib

## 安装步骤

1. 下载最新版本的 Ratziel 插件
2. 将下载的jar文件放入服务器的 plugins 目录
3. 重启服务器或使用插件加载器加载插件
4. 检查控制台，确保插件成功加载

## 插件权限

| 权限节点 | 描述 | 默认值 |
| --- | --- | --- |
| `ratziel.admin` | 管理员权限，可以使用所有命令 | OP |
| `ratziel.user` | 用户权限，可以使用基础命令 | true |
| `ratziel.item.give` | 给予自定义物品的权限 | OP |

## 配置文件

安装后，插件会生成以下配置文件：

- **config.yml**：主配置文件
- **items/**: 物品配置目录
- **lang/**: 语言文件目录

### 主配置文件示例

```yaml
# Ratziel 主配置文件

# 调试模式
debug: false

# 语言设置 (支持 zh_CN, en_US)
language: zh_CN

# 物品设置
items:
  # 物品配置文件夹
  folder: "items"
  # 是否自动重载物品
  auto-reload: true
  
# 脚本设置
script:
  # 默认脚本引擎
  default-engine: "js"
  # 是否启用脚本缓存
  enable-cache: true
```

## 命令

| 命令 | 描述 | 权限 |
| --- | --- | --- |
| `/ratziel reload` | 重载插件配置 | `ratziel.admin` |
| `/ratziel item give <玩家> <物品ID> [数量]` | 给予指定玩家自定义物品 | `ratziel.item.give` |
| `/ratziel item list` | 列出所有可用的物品 | `ratziel.admin` |
| `/ratziel nbt view` | 查看手持物品的NBT数据 | `ratziel.admin` |

## 常见问题

### 插件加载失败

如果插件加载失败，请检查：

1. TabooLib是否正确安装
2. Java版本是否满足要求
3. 控制台错误信息以排查具体问题

### 物品不显示或行为异常

1. 检查物品配置文件格式是否正确
2. 使用 `/ratziel reload` 重载配置
3. 确认物品ID是否正确

### 脚本执行错误

1. 检查脚本语法是否正确
2. 开启调试模式获取详细错误信息
3. 确认使用的API和变量是否正确

## 更新说明

更新插件时，建议先备份所有配置文件，然后按照以下步骤操作：

1. 停止服务器
2. 替换旧版本的jar文件
3. 启动服务器
4. 检查新版本是否需要更新配置文件格式 