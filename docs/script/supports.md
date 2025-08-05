---
title: 脚本支持
sidebar_position: 1
---

# 脚本支持

Ratziel 支持多种脚本语言，每种语言有其特定的用途和优点：

| 脚本类型                   | 标记   | 描述                         |
| -------------------------- | ------ | ---------------------------- |
| JavaScript                 | `js`   | 最常用的脚本语言，执行效率高 |
| JEXL                       | `jexl` | 轻量级表达式语言             |
| KotlinScripting (暂不支持) | `kts`  | 支持完整Kotlin语法的脚本     |

## JavaScript

Ratziel 支持两种 JavaScript 引擎，提供了最强大的脚本编程能力。

### Nashorn 引擎

**标识符：** `$js`、`$nashorn`

**特点：**
- Java 8+ 内置引擎
- 完整的 ES6 支持
- 与 Java 对象无缝交互
- 性能稳定可靠

**配置示例：**
```yaml
# 在 settings.yml 中配置
Script:
  JavaScript:
    engine: "nashorn"
```

### GraalJS 引擎

**标识符：** `$graaljs`

**特点：**
- 高性能 JavaScript 引擎
- 现代 JavaScript 特性支持
- 更好的内存管理
- 支持最新 ECMAScript 标准

**配置示例：**
```yaml
# 在 settings.yml 中配置
Script:
  JavaScript:
    engine: "graaljs"
```

## JEXL 表达式

**标识符：** `$jexl`

**特点：**
- 轻量级表达式语言
- 适合简单的计算和判断
- 语法类似于数学表达式
- 性能优异

**使用示例：**
```JavaScript
# 简单计算
player.health > 10 ? 20 : 10;

# 字符串操作
"Hello " + player.name + "!";

# 条件表达式
item.durability > 100 ? "耐久充足" : "需要修理";
```
