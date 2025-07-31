---
title: 动作语句
sidebar_position: 10
---

# 动作语句

语句块（Executable Block）在 Ratziel 中用于执行代码逻辑。

它们将配置中的动作定义转换为可执行的代码块，支持多种类型的逻辑处理，包括脚本执行、条件判断、多行处理等。

动作块系统采用解析器模式，将 JSON 配置元素转换为可执行的语句块。

# 语法支持

## 条件

```YAML
if: <condition>
then:
  - <action1>
  - <action2>
else:
  - <action3>
```

## 脚本语言选择

```YAML
$js:
  ... # 脚本内容
```