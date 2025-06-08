---
title: 命令系统
sidebar_position: 3
---

# 命令系统

## 主命令

Ratziel插件的主命令为 `/ratziel` 或简写 `/rz`

## 管理命令

| 命令 | 描述 | 权限 |
| --- | --- | --- |
| `/ratziel reload` | 重载插件配置 | `ratziel.admin` |
| `/ratziel version` | 显示插件版本信息 | `ratziel.admin` |
| `/ratziel debug` | 切换调试模式 | `ratziel.admin` |

## 物品命令

| 命令 | 描述 | 权限 |
| --- | --- | --- |
| `/ratziel item give <玩家> <物品ID> [数量]` | 给予指定玩家自定义物品 | `ratziel.item.give` |
| `/ratziel item list` | 列出所有可用的自定义物品 | `ratziel.admin` |
| `/ratziel item info <物品ID>` | 显示指定物品的详细信息 | `ratziel.admin` |

## NBT命令

| 命令 | 描述 | 权限 |
| --- | --- | --- |
| `/ratziel nbt view` | 查看手持物品的NBT数据 | `ratziel.admin` |
| `/ratziel nbt set <路径> <值>` | 设置手持物品的NBT值 | `ratziel.admin` |
| `/ratziel nbt remove <路径>` | 移除手持物品的NBT值 | `ratziel.admin` |

## 脚本命令

| 命令 | 描述 | 权限 |
| --- | --- | --- |
| `/ratziel script run <脚本ID>` | 运行指定脚本 | `ratziel.admin` |
| `/ratziel script exec <语言> <内容>` | 执行指定语言的脚本内容 | `ratziel.admin` |

## 命令参数说明

- `<玩家>`: 目标玩家名称
- `<物品ID>`: 配置文件中定义的物品ID
- `[数量]`: 可选的物品数量，默认为1
- `<路径>`: NBT数据的路径，例如 `display.Name`
- `<值>`: 要设置的NBT值
- `<脚本ID>`: 配置文件中定义的脚本ID
- `<语言>`: 脚本语言，如`js`、`kether`等

## 权限节点

| 权限节点 | 描述 | 默认值 |
| --- | --- | --- |
| `ratziel.admin` | 管理员权限，可以使用所有命令 | OP |
| `ratziel.user` | 用户权限，可以使用基础命令 | true |
| `ratziel.item.give` | 给予自定义物品的权限 | OP |
| `ratziel.item.list` | 查看物品列表的权限 | OP |
| `ratziel.nbt` | 使用NBT相关命令的权限 | OP |
| `ratziel.script` | 使用脚本相关命令的权限 | OP |

## 命令示例

### 给予物品

```
/ratziel item give TheFloodDragon KillCounter 1
```

这条命令会给名为 TheFloodDragon 的玩家1个ID为 KillCounter 的自定义物品。

### 查看NBT数据

```
/ratziel nbt view
```

这条命令会显示当前手持物品的完整NBT数据。

### 修改NBT数据

```
/ratziel nbt set display.Name '"§c超级神器"'
```

这条命令会将手持物品的显示名称修改为红色的"超级神器"。

### 执行脚本

```
/ratziel script exec js player.sendMessage("Hello World!")
```

这条命令会执行一段JavaScript代码，向执行命令的玩家发送"Hello World!"消息。 