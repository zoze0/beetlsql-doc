---
title: 配置
icon: peizhi
---

## BeetlSql 配置
```yaml
beetlsql: 
  # sqlManage，可以配置多个，用逗号隔开
  sqlManagers: sqlManager1,sqlManager2
  # sqlManage1 的配置
  sqlManager1: 
    # 数据源名称
    ds: dataSource
    # 指明 mapper 类的结尾，扫描到以 Mapper 结尾的类会为其自动生成代理类，注册为 Spring 的 Bean
    # 默认扫描 Mapper 结尾，可不配置。如果你不是 xxxMapper 这样以 Mapper 结尾的，则需要配置
    daoSuffix: Dao
    # 要扫描 Mapper 的包名
    basePackage: com.compamny.xxxx
    # POJO 和数据表列的名称转换，如驼峰 userName 转换为下划线的 user_name
    nameConversion: org.beetl.sql.core.UnderlinedNameConversion
    # 数据库方言
    dbStyle: org.beetl.sql.core.db.MySqlStyle
    # 是否是开发模式
    dev: true
    # 存放 sql 文件的根目录，默认就是 resources/sql/下，所以可以不配置，
    sqlPath: sql
    # sql 文件编码
    sqlFileCharset: utf-8
  sqlManager2:
    同上，省略...
```
### dbStyle 可配置值
| 数据库 | 配置值 |
| :--- | :--- |
| Mysql | `org.beetl.sql.core.db.MySqlStyle` |
| Oracle | `org.beetl.sql.core.db.OracleStyle` |
| Postgres | `org.beetl.sql.core.db.PostgresStyle` |
| SqlServer | `org.beetl.sql.core.db.SqlServerStyle` |
| SQLite | `org.beetl.sql.core.db.SQLiteStyle` |
| ShenTongSql | `org.beetl.sql.core.db.ShenTongSqlStyle` |
| PolarDB | `org.beetl.sql.core.db.PolarDBStyle` |
| OpenGauss | `org.beetl.sql.core.db.OpenGaussStyle` |
| Kingbase | `org.beetl.sql.core.db.KingbaseStyle` |
| H2 | `org.beetl.sql.core.db.H2Style` |
| DB2Sql | `org.beetl.sql.core.db.DB2SqlStyle` |

### nameConversion 可配置值
| 可选值 | 说明 |
| :--- | :--- |
| `org.beetl.sql.core.UnderlinedNameConversion` | 默认值，下划线命名转换，数据库 Sys_User，对应类 SysUser，列 user_Id，对应属性 userId |
| `org.beetl.sql.core.DefaultNameConversion` |  数据库命名完全按照 java 风格来，数据库表 SysUser，对应类 SysUser，列 userId，对应属性 userId |

## sqlManage 配置

在 Spring Boot 中`sqlManage`由 starter 装配，我们可以通过`SQLManagerCustomize`接口来修改

比如修改默认的日志拦截器
```java
@Configuration
public class BeeConfig {

    @Bean
    public SQLManagerCustomize sqlManagerCustomize() {
        return (sqlManagerName, manager) -> {
            // 设置 sql 拦截器
            manager.setInters(new Interceptor[]{new Slf4JLogInterceptor()});
        };
    }
}
```


