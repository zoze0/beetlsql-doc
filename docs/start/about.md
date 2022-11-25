---
title: 简介
icon: "mifeng"
---

## BeetlSQL 介绍
`BeetlSQL`的目标是提供 `开发敏捷`，`维护便捷`，`运行高速`的数据库访问框架，在一个系统多库的情况下，提供一致的代码编写方式。

### 支持的数据库

<table>
<th>传统数据库</th><th>大数据</th><th>物联网时序数据库</th><th>SQL 查询引擎</th><th>内存数据库</th>
<tr>
    <td><img src="/dbLogo/mysql.svg" height="30px"></td>
    <td><img src="/dbLogo/hbase-logo.png" height="30px"></td>
    <td><img class="black" src="/dbLogo/machbase.png" width="110px"></td>
    <td><img src="/dbLogo/apachedrill.png" height="30px"></td>
    <td><img src="/dbLogo/ignite.svg" height="30px"></td>
</tr>
<tr>
    <td><img src="/dbLogo/MariaDB.svg" height="30px"></td>    
    <td><img src="/dbLogo/clickhouseLogo.svg" width="30px"><img src="/dbLogo/clickhouse.svg" width="80px"></td>
    <td><img class="black" src="/dbLogo/taosdata-logo.png" height="25px"></td> 
    <td><img class="black" src="/dbLogo/presto.png" height="25px"></td>
    <td><img src="/dbLogo/couchbase.svg" height="30px"></td>
</tr>
</tr>
    <td><img src="/dbLogo/oracle.svg" height="30px" width="120px"></td>    
    <td><img class="cassandra" src="/dbLogo/cassandra.svg" height="25px"></td>
    <td><img src="/dbLogo/iotdb.png" height="30px"></td> 
    <td><img src="/dbLogo/druid.png" height="30px"></td>
    <td><img src="/dbLogo/hive_logo.jpg" height="30px"></td>
</tr>
<tr>
    <td><img src="/dbLogo/elephant.png" height="30px"></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><img src="/dbLogo/sqlite.gif" height="30px"> </td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><img src="/dbLogo/dameng.png" height="30px" width="120px"> </td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><img src="/dbLogo/shentong.png" height="30px"></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><img src="/dbLogo/derby-logo.png" height="30px"></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><img class="black" src="/dbLogo/kingbase.png" height="25px"></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><img src="/dbLogo/openGauss-logo.png" height="30px"></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><img src="/dbLogo/h2-logo.png" height="30px"></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>DB2</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>SQL Server</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>PolarDB</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
</tr>
</table>


### 适合用户

不想把精力浪费在简单据库增删改查上？BeetlSQL 内置数据库的 CRUD 功能

属于以 SQL 为中心的程序员派别？BeetlSQL 提供了较好的 SQL 管理，以及内置大量 SQL

对代码可维护性有高要求的架构师？BeetlSQL 的设计目的就是尽可能提高数据库访问代码可维护性

平台级产品需要跨库，支持各种客户数据库的？BeetlSQL 支持各种库，write once, run everywhere

系统需要连接多种库，比如连接商品库，连接订单库，或设备基本信息在 MySQL，设备数据在 Clickhouse 里？BeetlSQL 很容易支持各种库，并能以统一的方式使用

系统初期单库单表，长期需要多库多表？BeetlSQL 很容易实现多库多表而不需要程序员过多关注

## 作者介绍

李家智，网名闲大赋，是国内 [Beetl，BeetlSQL](http://ibeetl.com/)等基础软件开源作者，有 20 多年 Java 开发经验，至今还在一线开发。

我的其他作品

Beetl 高性能模板引擎，广泛用于国内外公司。

SpringBoot Plus，简单易用的，国内首个基于 Spring Boot 的后台系统框架

SpringBoot BBS，简单安全的 Java BBS

电子工业出版社《Spring Boot 2 精髓》，国内第一本 Spring Boot2 的畅销书籍，配套电子版本也在更新

电子工业出版社《Java 系统性能优化实战》，来自与多年 Java 性能实践，没有调优不了的 Java 系统
