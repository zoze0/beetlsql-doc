---
title: LambdaQuery 用法
icon: lambda
---

在实际应用场景中大部分时候是在针对单表进行操作，单独的写一条单表操作的 SQL 较为繁琐，为了能进行高效、快捷、优雅的进行单表操作，Query 查询器诞生了。
:::warning
使用`LamdbaQuery`(**推荐**) 必须使用 Java8 及以上版本。
:::

## 查询
### 获取 Query 查询器
我们继续以 user 表为例

取得`Query`有多种方式
```java
// 方式一：注入 mapper 后用 mapper 获取
userMapper.createLambdaQuery();

// 方式二：注入 sqlManage 后用 sqlmanage 获取 (指定类型)
Query<User> query = sqlManage.lambdaQuery(User.class);

// 方式三：注入 sqlManage 后用 sqlmanage 获取 (指定类型)
Query<User> query = sqlManager.query(User.class);
```
查询模糊查询用户名包含"t"，delete_time 不为空的数据，按照 id 倒序
```java
// 代码中直接使用 userMapper 查询
List<User> userList = userMapper.createLambdaQuery()
    .andLike(User::getName,"%t%")
    .andIsNotNull(User::getDeleteTime)
    .desc(User::getId)
    .select();
```
从上面的例子可以看出，Query 是使用链式调用，看起来就像一个完整的 sql 一般，使用方式遵从用户平时 SQL 编写习惯。

所有的条件列完之后，再调用操作方法（要执行的方法：`select`，`insert`，`update`，`page`, `count` 等等）

### 查询指定字段
如果我们只要查询表其中的几个字段怎么办？如我只要 name 和 id 字段：

```java{3,7}
// 用法一 (推荐)
userMapper.createLambdaQuery()
    .select(User::getName,User::getId);

// 用法二
userMapper.createLambdaQuery()
    .select("name","id");
```

### 复杂的条件查询

要进行一条复杂的条件查询 SQL，需要用到 `query.condition()` 方法，产生一个新的条件，比如我们要查询下面这条 SQL
```sql
SELECT * FROM `user` 
WHERE ( `id` IN( 100 , 101 , 102 ) 
AND `name` LIKE '%t%' ) OR ( `id` = 10086 )
```

```java{2,5}
userMapper.createLambdaQuery()
	.or(query.condition()
	.andIn("id", Arrays.asList(100, 101, 102))
    .andLike("name", "%t%"))
	.or(query.condition().andEq("id", 10086))
	.select();

```

### 查询字段智能判断是否为空
我们开发中，经常会遇到前端传过来一些搜索条件，后端根据搜索条件进行判断，不为空时加入查询条件。
例如前端一个用户列表，有一个根据用户名进行查询的搜索框，我们一般会这么写。

```java{4-6}
public User findUser(String userName){
	LambdaQuery<User> query = sqlManager.lambdaQuery(User.class);
	query.andEq(User::getDeleteFlag,0);
	if(StringUtil.isNotEmpty(userName)) {
        query.andEq(User::getUserName,userName);
	}
	return query.single();
}
```

如果有很多个这样的字段查询，会显得比较**臃肿**，beetlsql 很好的解决了这个问题。

Query 工具中内置了两个过滤值的静态方法，`filterEmpty`、`filterNull`，这两个方法返回了一个`StrongValue`对象。

`filterEmpty`方法主要作用是，当一个字段为空时不把他加入查询条件，当字段不为空时才加入查询条件。

:::tip 为空的判断标准：
1. 当字段为 String 类型，会判断空字符串以及 NULL。

2. 当字段为 Collection 类型以及其子类时，会调用 isEmpty 方法判断，以及 NULL。

3. 当字段为其他对象时，仅仅会判断 NULL。
:::

要实现上面的代码，我们只要下面这样写就行了：

```java{4}
public User findUser(String userName){
	LambdaQuery<User> query = sqlManager.lambdaQuery(User.class);
	return query.andEq(User::getDeleteFlag,0)
    .andEq(User::getUserName,Query.filterEmpty(userName))
    .single();
}
```

如果 userName 有值的情况下，例如等于"myName"，将会生成下面的语句：

```sql{2}
select * from user where delete_flag = 0 
and user_name = "myName" 
limit 0,1
```
当 userName 为空字符串或者 NULL 的时候，user_name 将不会参与条件查询：
```sql
select * from user where delete_flag = 0 
limit 0,1
```
filterNull 方法的作用也是类似的，但是此方法只会判断对象是否等于 NULL

> 自定义实现  
> 但是业务场景往往是复杂的，BeetSql 也提供了非常好的拓展性，`filterEmpty`,`filterNull`可以 [自定义实现](TODO)

## 插入
学会条件查询之后，其他操作就简单了，我们看下 insert。
### 全量插入
```java
User record = new User();
record.setName("new name");
Query<User> query = sqlManager.lambdaQuery(User.class);
int count = query.insert(record);
```
全量插入，会对所有的值进行插入，即使这个值是 NULL；返回影响的行数

### 选择字段插入
```java
User record = new User();
record.setName("new name2");
record.setCreateTime(new Date());
Query<User> query = sqlManager.lambdaQuery(User.class);
int count = query.insertSelective(record);
```
`insertSelective`方法，对 null 值的字段不插入；返回影响的行数

## 更新操作
update 和 insert 类似，有全量更新和选择列更新的方法；
### 全量更新 update 方法
```java
User record = new User();
record.setName("new name");
Query<User> query = sqlManager.query(User.class);
int count = query.andEq("id", 1637)
	.andLess("create_time", new Date())
	.andEq("name", "test")
	.update(record);
```
全量更新，会对所有的值进行更新，即使这个值是 null；返回影响的行数；


### 选择更新
```java
User record = new User();
record.setName("new name");
Query<User> query = sqlManager.query(User.class);
int count = query.andEq("id", 1637)
	.andLess("create_time", new Date())
	.andEq("name", "test")
	.updateSelective(record);
```

`updateSelective`方法，对 user 进行了一次有选择性的更新。非 null 值更新，null 值不更新；返回影响的行数；

## 删除操作
```java
Query<User> query = sqlManager.query(User.class);
int count = query.andEq("id", 1642)
                 .delete();
```
delete 操作非常简单，拼接好条件，调用 delete 方法即可；返回影响的行数。

## single 和 unique

在 beetlSql 中还提供了两个用来查询单条数据的方法，single 和 unique；

### single 单条查询

single 查询，查询出一条，如果没有，返回 null；
```java
Query<User> query = sqlManager.query(User.class);
User user = query.andEq("id", 1642).single();
```
### unique 单条查询

unique 查询和 single 稍微不同，**只能查询一条**，如果没有或者有多条，抛出异常

```java
Query<User> query = sqlManager.query(User.class);
User user = query.andEq("id", 1642).unique();
```
如果存在多条，或者没有则抛出异常：org.beetl.sql.core.BeetlSQLException

## COUNT 查询

count 查询主要用于统计行数，如下面的 SQL：
```sql
SELECT COUNT(1) FROM `user` WHERE `name` = 'myName' OR `id` = 1637 limit 0 , 10
```
```java
Query<User> query = sqlManager.query(User.class);
long count = query.andEq("name", "new name")
             .orEq("id", 1637).limit(1, 10)
             .count();
```
拼接条件，调用 count 方法，返回总行数。


## GROUP 分组查询和 Having 子句

有时候我们要进行分组查询，如以下 SQL：
```sql
SELECT * FROM `user` WHERE `id` IN(1637, 1639, 1640 ) GROUP BY name 
```
在 BeetlSql 中直接拼条件调用 group 方法，传入字段即可：
```java
Query<User> query = sqlManager.query(User.class);
List<User> list = query
	.andIn("id", Arrays.asList(1637, 1639, 1640))
 	.groupBy("name")
	.select();
```
在分组查询之后，我们可能还要进行 having 筛选，只需要在后面调用 having 方法，传入条件即可。
```sql
SELECT * FROM `user` WHERE `id` IN( 1637, 1639, 1640 ) GROUP BY name HAVING `create_time` IS NOT NULL 
```

```java
Query<User> query = sqlManager.query(User.class);
List<User> list = query
	.andIn("id", Arrays.asList(1637, 1639, 1640))
	.groupBy("name")
	.having(query.condition().andIsNotNull("create_time"))
	.select();
```

## ORDER BY 排序

进行排序查询时，只要调用 orderBy 方法，传入要排序的字段以及排序方式即可。
```sql
SELECT * FROM `user` WHERE `id` BETWEEN 1 AND 1640 
AND `name` LIKE '%t%' 
AND `create_time` IS NOT NULL ORDER BY id desc 
```
```java
Query<User> query = sqlManager.query(User.class);
List<User> list = query.andBetween("id", 1, 1640)
	.andLike("name", "%t%")
	.andIsNotNull("create_time")
	.orderBy("id desc").select();
```

## 总结:Query 主要操作简介
Query 接口分为两类

### 查询和更新操作

- `select`    触发查询，返回指定的对象列表
- `single`    触发查询，返回一个对象，如果没有，返回 null
- `unique`    触发查询，返回一个对象，如果没有，或者有多个，抛出异常
- `count`     对查询结果集求总数
- `delete`    删除符合条件的结果集
- `update`    全部字段更新，包括更新 null 值
- `updateSelective` 更新选中的结果集（null 不更新）
- `insert`    全部字段插入，包括插入 null 值
- `insertSelective`   有选择的插入，null 不插入

### 各种条件
| 标准 sql 操作符 |and 操作	| or 操作 |
| :--- | :--- | :--- |
| ==,!= | andEq,andNotEq | orEq,orNotEq |
| >,>= | andGreat,andGreatEq | orGreat,orGreatEq |
| <,<= | andLess,andLessEq | orLess,orLessEq |
| LIKE,NOT LIKE | andLike,andNotLike | orLike,orNotLike |
| IS NULL,IS NOT NULL | andIsNull,andIsNotNull | orIsNull,orIsNotNull |
| IN,NOT IN | andIn ,andNotIn | orIn,orNotIn |
| BETWEEN ,NOT BETWEEN | andBetween,andNotBetween | orBetween,orNotBetween |
| AND | ( .....) | and	or |

| 标准 sql |	Query 方法 |
| :--- | :--- |
| 限制结果结范围，依赖于不同数据库翻页	| limit (默认从 1 开始，会自动处理)|
| ORDER BY | orderBy, desc,asc |
| GROUP BY | groupBy |
| HAVING | having |
