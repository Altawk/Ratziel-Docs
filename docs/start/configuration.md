---
title: 配置文件
sidebar_position: 1
---

# 配置插件

若插件成功安装，你将会在服务端插件目录下看到一个名为 `Ratziel` 的目录，其结构如下。

```text
Ratziel
├── lang ···················· 语言文件目录
├── workspace ··············· 工作空间目录
├── settings.yml ············ 插件配置文件
```

## 主要配置文件

```YAML title="Ratziel/settings.yml"
Workspaces:
  # 默认工作空间
  default:
    # 若开启则会监听工作空间内的文件变化,并自动重新加载变化文件
    listen: true
    filter: '^(?![#!]).*\.(?i)(yaml|yml|toml|tml|json|conf)$'
    path: 'plugins/Ratziel/workspace'
    # 是否使用文件名称当做元素名称
    use-filename: false
    # 统一元素类型 (None 代表不统一)
    unified-type: None

Message:
  # 是否在消息组件序列化的过程中默认取消斜体
  non-italic-by-default: true

Script:
  # 默认使用的脚本语言
  default: JavaScript
  languages:
    # JavaScript 脚本语言
    JavaScript:
      # 是否启用
      enabled: true
      # 使用的脚本引擎 (Nashorn/GraalJS)
      engine: nashorn
    # Jexl
    Jexl:
      enabled: true
#    # Kotlin Scripting (暂不支持)
#    KotlinScripting:
#      enabled: false
```