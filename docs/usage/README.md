---
title: 概述
icon: ico
---

使用 BeetlSOL 完成数据库增删查改操作，主要有以下几种使用方式：

| 使用方式 | 简要说明 |
| :---    | :---   |
| 使用`BaseMapper` | 内置 CRUD 方法 |
| 使用`lambdaQuery` | 以 Java 代码形式生成 sql |
| 使用`@Sql`注解 | 直接在注解上写 sql 语句 |
| 使用`@Template`注解 | 直接注解上写 sql 语句 |
| 使用`@SpringData`注解 | 模仿了 Spring Data 中通过方法名解析出 sql 语句的功能，如 findById 表示根据 id 来查询 |
| 使用`Markdown`文件 | sql 语句写在 Markdown 文件中，方便管理 |

> 每一种使用方式都有其适用场景，本章节我们将介绍如何使用