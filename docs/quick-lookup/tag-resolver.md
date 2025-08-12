---
title: 标签解析器
sidebar_position: 5
---

# 标签解析器

**标签解析器（Tag Resolver）** 用于解析配置文件中标签用法。

它们允许您在配置中使用动态内容，如变量替换、数据引用、脚本执行等。

## 基本用法

标签使用大括号 `{}` 包围，基本用法为：`{解析器名称:参数1:参数2:...}`

**示例：**
```yaml
name: "玩家 {papi:player_name} 的物品"
lore:
  - "击杀数: {data:kill_count}"
```

## 解析器类型

Ratziel 提供两种类型的标签解析器：

- **静态解析器:** 在物品生成时解析一次，结果固定不变。
- **动态解析器:** 在物品显示时实时解析，内容可以动态变化。

---

## 解析器列表

### PAPI 变量解析器

用于解析 PlaceholderAPI 的变量。

**别名：** `papi`

**用法：**
- `{papi:变量名}`
- `{papi:变量名:变量参数1:变量参数2:...}`

---

### 数据解析器

数据解析器，用于访问物品的数据层内容。

**别名：** `data`

**用法：** `{data:数据名称:默认值}`

**示例：**
```yaml
data:
  onwer: MC_jiao_long
lore:
  - "所有者: {data:owner:无名氏}"
```

---

### 计算解析器

计算解析器，用于访问计算层和属性层的内容。

**别名：** `compute`、`computed`、`define`、`props`、`consts`

**用法：** `{compute:变量名称}`

**示例：**
```yaml
name: "魔法武器 (攻击力: {compute:attack_power})"
compute:
  attack_power: |-
    level = item.get("level") || 1
    return 10 + (level * 5)
data:
  level: 1
```

---

### 动态解析器

用于标记需要动态解析的内容。

**别名：** `dynamic`

**用法：** `{dynamic:解析器名称:参数}`

**示例：**
```yaml
name: "杀敌数: {dynamic:data:kill_count}"
data:
  kill_count: 0
action:
  onKill:
    - 'item.set("kill_count", item.get("kill_count") + 1)'
```

---

### 脚本解析器

直接使用脚本显示信息。

**别名：** `script`

**用法：** 
- `{script:脚本内容}`
- `{script:语言:脚本内容}`

**示例：**
```yaml
name: "随机物品"
lore:
  - "随机数: {script:Math.floor(Math.random() * 100)}"
  - "当前时间: {script:js:new Date().toLocaleString()}"
  - "玩家名称: {script:player.getName()}"
```
