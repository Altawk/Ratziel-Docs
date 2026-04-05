---
title: 脚本与内联脚本（重写版）
sidebar_position: 12
---

# 脚本与内联脚本

Ratziel 里很多“会动的配置”，背后其实都离不开脚本。

但对使用者来说，不需要先理解底层实现。你只需要先掌握：

- 脚本能写在哪
- 什么时候该用脚本
- 用哪种写法最顺手

## 你什么时候会用到脚本

最常见的场景有：

- 给 `data` 生成动态初值
- 给 `define` 写计算逻辑
- 在 `action` 里执行行为
- 在字符串里插入一小段计算结果
- 把较长逻辑拆到脚本文件里

## 当前支持的脚本语言

根据当前脚本模块配置和实现，文档里建议按下面理解：

| 语言 | 常见标识 | 适合场景 |
| --- | --- | --- |
| JavaScript | `js` | 最通用，适合大多数用户 |
| Jexl | `jexl` | 轻量判断、简单表达式 |
| KotlinScripting | `kts` | 更复杂的 Kotlin 风格脚本 |
| Fluxon | `fs` | 进阶场景，可按需尝试 |

如果你不确定选什么，**先用 JavaScript**。

## 默认脚本语言在哪里设置

脚本配置位于：

```yaml
Script:
  default: JavaScript
  languages:
    JavaScript:
      enabled: true
      engine: Nashorn
    Jexl:
      enabled: true
    KotlinScripting:
      enabled: false
    Fluxon:
      enabled: true
```

你最常关心的只有两件事：

- `default`：默认脚本语言
- `enabled`：该语言是否启用

如果某种语言没启用，对应写法就不能正常工作。

## 最常用的 4 种脚本写法

## 1. 动作中的脚本

最常见，也最容易接触到。

```yaml
action:
  onRight:
    - 'player.sendMessage("你右键了物品")'
```

这种写法适合：

- 触发后发消息
- 改物品数据
- 播放音效
- 调用 Bukkit API

## 2. 显式脚本块 `$js:` / `$jexl:` / `$kts:`

如果你要在 `data`、`define` 等位置明确写脚本，推荐这种写法。

```yaml
data:
  owner:
    $js: 'player.getName()'

define:
  rank:
    $js: 'kills >= 100 ? "传说" : "普通"'
```

这种方式的优点是：

- 一眼就能看出这里是脚本
- 比把脚本伪装成普通字符串更清晰
- 更适合长期维护

## 3. 内联脚本 `{{ ... }}`

适合在字符串中插入一小段结果。

```yaml
name: '<yellow>{{player.getName()}} 的武器'
```

也可以显式指定语言：

```yaml
lore:
  - '状态：{{jexl:player.health > 10 ? "安全" : "危险"}}'
```

这种方式最适合：

- 文本里插入一小段计算
- 一次性显示玩家名、判断结果、短文本

不适合：

- 很长的逻辑
- 多步骤处理

## 4. 脚本标签 `{script:...}`

另一种把脚本结果插入文本的方式：

```yaml
lore:
  - '&7当前玩家：{script:player.getName()}'
  - '&7状态：{script:jexl:player.health > 10 ? "安全" : "危险"}'
```

和 `{{...}}` 相比，它更像“标签解析器写法”。

如果只是简单插值，你可以在 `{{...}}` 和 `{script:...}` 里选你更顺手的一种。

## 5. 脚本文件引用

当逻辑开始变长时，不建议继续把所有内容堆在 YAML 里。

这时可以改用脚本文件：

```yaml
action:
  onRight:
    script: cast-fireball.js
```

也可以在脚本块里配合 `imports` 使用更完整的结构。

对使用者来说，核心思路就是：

- **短逻辑写在 YAML 里**
- **长逻辑拆到脚本文件里**

## 最小示例 1：数据初值脚本

```yaml
OwnerItem:
  item:
    material: PAPER
    lore:
      - '&7主人：{data:owner:未知}'
    data:
      owner:
        $js: 'player.getName()'
```

## 最小示例 2：计算层脚本

```yaml
RankItem:
  item:
    material: DIAMOND
    lore:
      - '&7评级：{define:rank}'
    data:
      kills: 0
    define:
      rank:
        $js: 'kills >= 100 ? "传说" : "普通"'
```

## 最小示例 3：动作脚本

```yaml
MessageStick:
  item:
    material: STICK
    action:
      onRight:
        - 'player.sendMessage("你触发了动作脚本")'
```

## 最小示例 4：文本内联脚本

```yaml
ScriptNameCard:
  item:
    material: PAPER
    name: '<green>{{player.getName()}} 的名片'
```

## 新手最推荐的使用顺序

### 第一步：先只在动作里写脚本
因为最容易看到效果。

### 第二步：在 `data` 和 `define` 里用 `$js:`
因为结构最清晰。

### 第三步：再尝试 `{{...}}`
适合给 name / lore 做小型动态文本。

### 第四步：逻辑长了再拆脚本文件
不要太早把所有东西拆出去，也不要把所有逻辑都塞在一行里。

## 常见选择建议

### 想做复杂逻辑
优先：

- `action`
- `$js:`
- 脚本文件

### 想在文本里做短计算
优先：

- `{{...}}`
- `{script:...}`

### 想让数据初值来自玩家或环境
优先：

- `data` + `$js:`

### 想做显示用派生值
优先：

- `define` + `$js:`

## 常见问题

### 1. 为什么脚本没生效
先检查：

- 对应脚本语言是否启用
- 写法是否是显式脚本写法
- 是否重载了配置

### 2. 为什么字符串没有被当脚本执行
默认情况下，不是所有字符串都会自动按脚本解析。

如果你想明确执行脚本，优先使用：

- `$js:`
- `{{...}}`
- `{script:...}`
- `script: 文件名`

### 3. 到底该用 `{{...}}` 还是 `{script:...}`
如果你是在普通文本里插一小段结果，两个都能用。

新手通常优先用：

- `{{...}}`

因为更直观。

## 下一步

建议把脚本页和这些内容结合使用：

- [物品动作（重写版）](./item-action.md)
- [物品数据（重写版）](./item-data.md)
- [物品标签（重写版）](./item-tag.md)
- [动态物品（重写版）](./dynamic-items.md)
