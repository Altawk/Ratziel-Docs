---
title: 动作语句块
sidebar_position: 3
---

# 动作语句块

**语句块（Executable Block）** 用于执行代码逻辑。

语句块解析器将配置中的半结构化数据解析为可执行的语句块。

支持多种类型的逻辑处理，包括脚本执行、条件判断、多行处理等等。

## 语法支持

### 条件

```YAML
if: <condition>
then:
  - <action1>
  - <action2>
else:
  - <action3>
```

### 脚本语言支持

**切换脚本语言**
```YAML
$js: # 切换脚本语言
  ... # 脚本内容
```

**导入类**
```YAML
imports: # 或者 import
  - 'org.bukkit.inventory.ItemStack' # 导入类
  - 'org.bukkit.*' # 导入包
  - 'some_functions.js' # 导入脚本
```

**使用脚本文件**
```YAML
script: run.js # 这将直接执行脚本文件
```