---
title: 快速开始
icon: launch
---

## 引入
此处我们以 [Spring Boot](https://spring.io/guides/gs/spring-boot/) 为例，快速引入 `BeetlSQL`
  
> 同时我们还支持 `Act`, `JFinal`, `Solon` 等框架，与它们集成详见[TODO](TODO)

### 准备工作
需要有一个 Spring Boot 工程，推荐使用 [Spring Initializr](https://start.spring.io/) 在线快速生成一个项目

### 1. 在`pom.xml`中添加依赖
<CodeGroup>
<CodeGroupItem title="maven" active>

```xml
<!-- beetlsql-starter -->
<dependency>
    <groupId>com.ibeetl</groupId>
    <artifactId>sql-springboot-starter</artifactId>
    <version>3.19.3-RELEASE</version>
</dependency>

<!-- 数据库驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

<!-- 引入数据库连接池 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.6</version>
</dependency>
```
</CodeGroupItem>
<CodeGroupItem title="gradle">

```java
// https://mvnrepository.com/artifact/com.ibeetl/sql-springboot-starter
implementation 'com.ibeetl:sql-springboot-starter:3.19.3-RELEASE'
```
</CodeGroupItem>
</CodeGroup>

### 2. 创建一张用户表
以 mysql 为例
```sql
CREATE TABLE `user` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `name` varchar(64) DEFAULT NULL,
      `age` int(4) DEFAULT NULL,
      `create_date` datetime DEFAULT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
### 3. 编写一个与数据库表对应的 User 类（或者可以通过 SQLManager 的 gen 方法生成此类，参考一下节）

```java
/**
* 与数据库 user 表对应的 POJO
*/
@Data
public class User  {
    private Integer id ;

    private Integer age ;

    private String name ;

    private Date createDate ;
}
```

### 4. 新建 UserMapper 接口
```java
public interface UserMapper extends BaseMapper<User> {

}
```

### 5. 在`application.yml`中添加配置
```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    # 改为你的数据库链接
    url: jdbc:mysql://127.0.0.1:3306/test?allowPublicKeyRetrieval=true&useUnicode=true&
    # 改为你的数据库用户名
    username: root
    # 改为你的数据库密码
    password: test

beetlsql:
  sqlManagers: sqlManager1
  sqlManager1:
    ds: dataSource
    # 改为第四步你的 Mapper 所在的包名
    basePackage: com.xxx
```
> 更多 BeetlSQL 配置参见 [配置](/advanced/config.md)

----

::: tip
:tada: 到此处您已经集成了可以对`user 表`**增删查改**的全部功能

并且不需要写一句 SQL

下面我们在一个 Controller 里展示用法
:::

### 使用 mapper 内置 CRUD 方法
##### 新建一个`UserController`类
```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserMapper userMapper;

    /**
     * 新增用户
     */
    @RequestMapping("insert")
    public String insertUser(User user) {
        userMapper.insert(user);
        return "新增用户成功，用户 id: " + user.getId();
    }

    /**
     * 查询用户
     */
    @RequestMapping("query")
    public String queryUser(Integer id) {
        User user = userMapper.single(id);
        return "查询用户成功，用户：" + user.toString();
    }

    /**
     * 修改用户
     */
    @RequestMapping("update")
    public String updateUser(User user) {
        userMapper.updateById(user);
        return "修改用户成功，用户 id=" + user.getId();
    }

    /**
     * 删除用户
     */
    @RequestMapping("delete")
    public String deleteUser(Integer id) {
        userMapper.deleteById(id);
        return "删除成功";
    }
}
```

---

仅仅只需几步就可以集成对数据库的增删查改操作，不需要复杂的配置，是不是非常简单！接下来我们介绍 BeetlSQL 的高级用法。

---


