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

### 脚本语言选择

```YAML
$js:
  ... # 脚本内容
```