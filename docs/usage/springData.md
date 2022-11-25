---
title: SpringData 注解用法
icon: leaf
---

`@SpringData`模仿了 Spring Data 中通过方法名解析出 sql 语句的功能，如 findById，表示根据 id 属性值查询
findByNameAndAgeOrderByIdDesc，则表示根据 name 和 age 属性查询，且输出结果按照 Id 降序排序

#### 使用方法
继续以 User 为例
```java{3}
public interface UserMapper extends BaseMapper<User> {

    @SpringData
    List<User> queryByNameOrderById(String name);
}
```