---
title: 注解
icon: at
---

## POJO 相关注解

### [@Table](xxx)
@Table 注解用在 POJO 上，用于数据库表名和 POJO 名称不一致的情况

例如表名为`tb_user`, POJO 为`User`，则添加`@Table(name = "tb_user")`注解，将表`tb_user`和`User`对应

```java{2}
@Data
@Table(name = "tb_user")
public class User  {
    private Integer id ;

    private Integer age ;

    private String name ;

    private Date createDate ;
}
```

### [@AutoID](xxx), [AssignID](xxx), [SeqID](xxx)
用于在 POJO 中指定数据库主键类型
| 注解 | 说明 |
| :--- | :--- |
| `@AutoID` | 作用于属性字段或者 getter 方法，告诉 beetlsql，这是自增主键，对应于数据自增长 |
| `@AssignID` | 作用于属性字段或者 getter 方法，告诉 beetlsql，这是程序指定主键 |
| `@SeqID` |     作用于 getter 方法，告诉 beetlsql，这是序列主键 |

```java{3}
@Data
public class User  {
    @AutoID // 指明表的 id 列是自增
    private Integer id ;

    private Integer age ;

    private String name ;

    private Date createDate ;
}
```
`@AssignID`代码设定主键可以传入 id 的生成策略以自动生成序列

beetl 默认提供了 [snowflake 算法，一个用于分布式环境的 id 生成器](https://github.com/twitter/snowflake)
```java{1}
@AssignID("simple")
public Long getId() {
    return id;
}
```
**simple** 是 beetlsql 提供的一个默认的 snowflake 实现，你可以通过 sqlManager 自己注册 id 生成器
```java{1,8}
sqlManager.addIdAutonGen("uuid2", new IDAutoGen(){
    @Override
    public Object nextID(String params) {
        return "hi"+new Random().nextInt(10000);
    }
});

@AssignID("uuid2")
public Long getId() {
    return id;
}
```

### [@Column](xxx)
通常数据库列名和实体类对应关系已经由 NameConversion 转化好了，如果你有特殊的命名需求，可以使用此注解
```java{6}
@Data
public class User  {
    @AutoID // 指明表的 id 列是自增
    private Integer id ;

    @Colum("my_age")
    private Integer age ;

    private String name ;

    private Date createDate ;
}
```
使用`@Colum("my_age")`后`age`字段可以对应到 user 数据表中的`my_age`列

## Mapper 相关注解
### [@SqlResource](xxx)
`@SqlResource`注解在 Mapper 上，指明 sql 片段所在的文件，如没有使用此注解，则会默认通过泛型类来查找，规则是泛型类名的首字母小写作为文件名
```java{1}
@SqlResource("myUser")
public interface UserMapper extends BaseMapper<User> {
      
     List<User> selectByName(String name);
}
```
如果未使用`@SqlResource`则去`resources/sql/`下找`user.md`

使用`@SqlResource("myUser")`后则去`resources/sql/`下找`myUser.md`

### [@SpringData](xxx)
`@SpringData`模仿了 Spring Data 中通过方法名解析出 sql 语句的功能，比如 findById，则表示根据 id 属性查询。findByNameAndAgeOrderByIdDesc，则表示根据 name 和 age 属性查询，且输出结果按照 Id 降序排序。

要了解 BeetlSQL3 支持的所有 Spring Data 关键字，可以查看 [SpringDataBuilder](https://gitee.com/xiandafu/beetlsql/blob/master/sql-mapper/src/main/java/org/beetl/sql/mapper/springdata/SpringDataBuilder.java) 类，或参考 [Spring Data 文档](https://docs.spring.io/spring-data/jdbc/docs/2.0.1.RELEASE/reference/html/#jdbc.query-methods)