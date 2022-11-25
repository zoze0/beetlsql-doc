---
title: 常见问题
icon: faq
---
[[toc]]


## 1. can not issue data manipulation statement with executeQuery
**原因：** 更新或删除的 sql 使用了查询的 executeQuery

**解决：** 在 mapper 的方法上加`@update`或`@BatchUpdate`(批量更新时)

**文档：** [@Sql 注解用法](./usage/sqlAnnotation.md), [@Template 注解用法](./usage/templateAnnotation.md)

## 2. beetlsql 与 mybatis/mybatis-plus 共存吗？如果可以需要做什么设置吗
**可以** 已经有用户这么使用

[issues/I4CMB1](https://gitee.com/xiandafu/beetlsql/issues/I4CMB1)

[issues/I3V9D0](https://gitee.com/xiandafu/beetlsql/issues/I3V9D0)
