---
title: '@Template 注解用法'
icon: hash
---

使用`@Template`注解和`@Sql`类似


#### 使用方法
继续以 User 为例
```java{3}
public interface UserMapper extends BaseMapper<User> {

    @Template("select * from sys_user where id = #{id}")
    User queryUserById(Integer id);
}
```

:::warning 注意占位符
`@Sql`占位符是 `?` 

`@Template`占位符是 `#{}`
:::


在 UserMapper 中定义了`queryUserById`方法，并使用`@Template`提供一个 Sql 语句
那么我们可以在注入 UserMapper 后调用此方法
```java
@Autowired
UserMapper userMapper;
    
@RequestMapping("test")
public String test() {
    User user = userMapper.queryUserById(100);
}
```

定义更新方法
```java{3,4}
public interface UserMapper extends BaseMapper<User> {

    @Sql("update sys_user set name=#{name} where id=#{id}")
    @Update
    int updateName(String name,Integer id);
}
```

:::tip
不同于 2.x 版本回自动推测类型，3.x 版本需要显示的使用`@Update`注解表明是一个更新或删除类的 sql,`@BatchUpdate`注解表明是一个批量更新 sql


使用`@Select`注解表明是一个查询 Sql(默认行为，所以可省略)
:::

---
`@Template`注解的方法参数返回值取决于于 sql 查询结果，不限定于 Mapper 定义的泛型，**可以是任意 POJO**