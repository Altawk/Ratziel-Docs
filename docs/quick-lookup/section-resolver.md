---
title: 片段解析器
sidebar_position: 5
---

# 片段解析器

**片段解析器（Section Resolver）** 用于处理配置文件片段。

## 解析器列表

### PAPI 解析器

PlaceholderAPI 解析器，处理 PAPI 变量。

**示例：**
```yaml
lore:
  - "玩家: %player_name%"
  - "等级: %player_level%"
  - "血量: %player_health%"
  - "位置: %player_x%, %player_y%, %player_z%"
  - "余额: %vault_eco_balance%"
```

**注意：** 需要安装 PlaceholderAPI 插件及相关扩展。

---

### 内联脚本解析器

处理配置中的脚本代码块。

**用法：**
- `{{ 脚本内容 }}`
- `{{ 语言:脚本内容 }}`

---
