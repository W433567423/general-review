## MySQL知识

### MySQL命令

- 登录：`mysql -u【账户】 -p【密码】`

### MySQL数据类型

MySQL支持的数据类型有：数字类型、日期和时间类型、字符串类型、空间类型和JSON数据类型（>MySQL v5.7）

- 数字类型(整形：TINYINT、SMALLINT、MEDIUMINT、INT、BIGINT，浮点型：FLOAT、DOUBLE，精确型：DECIMAL、NUMERIC)

- 日期和时间类型

  - YEAR：存储YYYY格式

  - DATE：存储YYYY-MM-DD格式，没有时间部分，范围在1000-01-01到9999-12-31

  - DATETIME：存储YYYY-MM-DD hh:mm:ss格式，范围在1000-01-01 00:00:00到9999-12-31 23:59:59

  - TIMESTAMP：存储YYYY-MM-DD hh:mm:ss格式，范围在1970-01-01 00:00:01到2038-01-19 03:14:07(UTC)

    > DATETIME，TIMESTAMP均可表达微秒(6位)

- 字符串类型

  - CHAR:创建表时为固定长度，范围在0-255，查询时会被删除后面的空格
  - VARCHAR：可变长度的字符串，范围在0-65535，查询时不会被删除后面的空格
  - BINARY和YARBINARY：存储字节字符串(不常见)
  - BLOB：存储大的二进制类型(不常见)
  - TEXT：存储大的字符串类型

### 表约束

- 主键(PRIMARY KEY)
  - 唯一索引
  - Not Null
  - 联合主键(多列索引)
  - _与业务无关_
- 唯一(UNIQUE)
- 不为空(NOT NULL)
- 默认(DEFULT)
- 自动递增(AUTO_INCREAMENT)

---

## SQL语言

### DDL(数据定义语言)

对数据库或表进行：创建、删除、修改等操作

- 展示数据库：`show databases;`
  - information_schema：信息数据库，其中包括MySQL在维护的其他数据库、表、列、访问权限等信息
  - performance_schema：性能数据库，记录着MySQL Server数据库引擎在运行过程中的一些资源消耗相关的信息
  - mysql：用于存储数据库管理者的用户信息、权限信息以及一些日志信息等
  - sys：相当于是一个简易版的performance_schema，将性能数据库中的数据汇总成更容易理解的形式
- 创建数据库：`create database if not exists test;`
- 选择数据库：`use test;`
- 查看当前使用的数据库：`select database();`
- 删除数据库：`drop database if exists test;`
- 修改数据库编码：`alter database tutu character set = utf8 collate = utf8_unicode_ci;`

### DML(数据操作语言)

对表进行：添加、删除、修改等操作

- 查看数据表：`show tables;`
- 创建数据表：`create table if not exit users (name varchar(10),age int,height double);`
- 删除数据表：`drop table if exists test;`
- 查看表结构：`desc test;`
- 查找表中数据：`select * from users;`

#### 修改表

- 修改表名：``alter table `users` rename to `user`; ``

- 添加一列：``alear table `users` add `updatedTime` timestamp;``

- 修改字段名：``alter table `users` change `phoneNum` `telephoneNum` varchar(20);``

- 修改字段类型：`` alter table `users` modify `name` varchar(20);``

- 删除字段：``alter table `users` drop `age`;``

- createdTime、updatedTime自动设置：

  ```sql
  alear tabel `users` modify `createdTime` timestamp default current_timestamp;
  alear tabel `users` modify `updatedTime` timestamp default current_timestamp on update current_timestamp;
  ```

#### 创建表

- 根据一张表结构创建另一张表：``create table `user` like `users`;``
- 根据一张表内容创建另一张表：``create table `user` (select * from `users`);``

#### 插入数据

- 插入一条数据(对应字段)：``insert into `users` (name,age,height) values ('tutu',20,1.8);``
- 插入一条数据(所有字段)：``insert into `users` values ('tutu',20,1.8);``

#### 删除数据

- 删除表中所有数据：``delete from `users`;``
- 删除表中符合条件的数据：``delete from `users` where id = 1;``

#### 更新数据

- ``update `users` set name = 'tutu', age = 20 where id = 2;``

### DQL(数据查询语言)

从数据库中查询记录

```sql
select select_expr [, select_expr]...
	[from table_references]
	[where where_condition]
	[order by expr [asc |desc]]
	[limit {[offset,] row_count | row_count offset offset}]
	[group by expr]
	[having where_condition]
```

#### 基本查询

- 查询表中所有字段以及所有数据``SELECT * FROM `product`;``
- 查询表中指定的字段``SELECT title,price from `product`;``
- 查询时对字段起别名``SELECT title as productTitle,price from `product`;``

#### where条件查询

##### 条件判断语句

```sql
SELECT * FROM `product` WHERE price < 1000;

SELECT * FROM `product` WHERE price != 1000; # 不等于
SELECT * FROM `product` WHERE price <> 1000; # 不等于

SELECT * FROM `product` WHERE brand = 'HUAWEI';
```

##### 逻辑运算语句

```sql
# 与: AND，&&，BETWEEN
SELECT * FROM `product` WHERE price >1000 AND price < 1200;
SELECT * FROM `product` WHERE price >1000 && price < 1200;
SELECT * FROM `product` WHERE price BETWEEN 1000 AND 1200; # 包含等于

# 或: OR，||

# 查询NULL: IS，IS NOT
SELECT * FROM `product` WHERE url IS NULL;
```

##### 模糊查询

```sql
# LIKE 关键字
# % 匹配任意个任意字符
# _ 匹配一个任意字符
SELECT * from `product` WHERE title LIKE '%M%';
SELECT * from `product` WHERE title LIKE 'p_';
```

##### 范围查询

```sql
# IN 关键字
SELECT * from `product` WHERE brand IN ('HUAWER','XIAOMI');
```

#### 查询结果

##### 排序

```sql
# ORDER BY
# DESC 降序 ASC升序
SELECT * FROM `product`
WHERE
	brand IN ( 'HUAWER', 'XIAOMI' )
ORDER BY
	price ASC,score DESC;
```

##### 分页

```sql
# LIMIT {[offset,] row_count|row_count OFFSET offset}
SELECT * FROM `product` LIMIT 20 OFFSET 0;
SELECT * FROM `product` LIMIT 0,20;
```

#### 聚合函数和GROUP BY

- 聚合函数

  ```sql
  # SUM 求和
  # AVG 求平均
  # MAX 求最大
  # MIN 求最小
  # COUNT 求总数
  # DISTINCT 去重
  SELECT SUM(price) totalPrice FROM `product`;
  SELECT SUM(price) totalPrice FROM `product` WHERE brand = 'HUAWEI';
  SELECT AVG(price) FROM `product`;
  SELECT MAX(price) FROM `product`;
  SELECT MIN(price) FROM `product`;
  SELECT COUNT(price) FROM `product` WHERE brand = 'XIAOMI';
  SELECT COUNT(DISTINCT price) FROM `product` WHERE brand = 'XIAOMI';
  ```

- GROUP BY

  ```sql
  select brand,AVG(price),COUNT(*),AVG(score) FROM `product` GROUP BY brand;
  ```

- HAVING

  对分组后的结果进行筛选

  ```sql
  select brand,AVG(price),COUNT(*) count,AVG(score) FROM `product` GROUP BY brand HAVING count>100;
  ```

  > WHERE作用于表，HAVING作用于组

#### 外键约束

```sql
ALTER TABLE `product` ADD `brand_id` INT; # 添加字段
ALTER TABLE `product` ADD FOREIGN KEY(brand_id) REFERENCES brand(id); #  设置外键约束
```

> 外键一般与主键对应

- 更新外键约束

  ```sql
  # RESTRICT(默认):当更新或删除某个记录时，会检查该记录是否有关联的外键记录，有的话会报错，不允许更新或删除
  # NOACTION:与RESTRICT一致，是SQL标准
  # CASCADE:当更新或删除某个记录时，会同时更新其外键记录值
  # SETBNULL:当更新或删除某个记录时，会将其外键记录设为NULL
  SHOW CREATE TABLE `product` # 查看外键约束的构造
  ALTER TABLE `product` DROP FOREIGN KEY product_ibfk_1; # 删除外键约束
  ALTER TABLE `product` ADD FOREIGN KEY(brand_id) REFERENCES brand(id)
  	ON UPDATE CASCADE
  	ON DELETE RESTRICT; #  设置外键约束
  ```

#### 多表查询

笛卡尔乘积

##### 多表连接(SQL JOIN)

JOIN类型:左连接，右连接，内连接，全连接

```sql
-- 左连接
SELECT * from `product` LEFT OUTER JOIN `brand` on product.brand_id = brand.id;  # 查询所有手机以及对应的品牌数据
SELECT * from `product` LEFT OUTER JOIN `brand` on product.brand_id = brand.id WHERE brand.id IS NULL; # 查询没有对应品牌的手机数据

-- 右连接
SELECT * from `product` RIGHT JOIN `brand` on product.brand_id = brand.id; # 查询所有品牌以及对应的手机数据
SELECT * from `product` RIGHT JOIN `brand` on product.brand_id = brand.id  WHERE product.brand_id IS NULL; # 查询没有对应手机的品牌数据

-- 内连接
SELECT * from `product` JOIN `brand` on product.brand_id = brand.id; # 查询所有品牌以及对应的手机数据(比全连接在where更好)
SELECT * from `product` JOIN `brand` on product.brand_id = brand.id  WHERE product.price = 2443;

-- 全连接(mySQS不支持)
SELECT * from `product` FULL JOIN `brand` on product.brand_id = brand.id;
-- 联合(MySQL进行全连接)
(SELECT * from `product` LEFT OUTER JOIN `brand` on product.brand_id = brand.id) UNION (SELECT * from `product` RIGHT JOIN `brand` on product.brand_id = brand.id)
-- (外连接)
(SELECT * from `product` LEFT OUTER JOIN `brand` on product.brand_id = brand.id WHERE brand.id IS NULL) UNION (SELECT * from `product` RIGHT JOIN `brand` on product.brand_id = brand.id WHERE product.brand_id IS NULL)
```

##### 数据库关系

- 一对一的关系

- 一对多的关系

- 多对多的关系

  ​ 学生课表示例

  ```sql
  -- 学生表
  CREATE TABLE IF NOT EXISTS student(
  	id INT PRIMARY KEY AUTO_INCREMENT,
  	name VARCHAR(20) NOT NULL,
  	age INT
  );

  -- 课程表
  CREATE TABLE IF NOT EXISTS course(
  	id INT PRIMARY KEY AUTO_INCREMENT,
  	name VARCHAR(20) NOT NULL,
  	price DOUBLE
  );


  -- 学生课程关系表
  CREATE TABLE IF NOT EXISTS student_select_course(
  	id INT PRIMARY KEY AUTO_INCREMENT,
  	student_id INT NOT NULL,
  	course_id INT NOT NULL,
  	FOREIGN KEY (student_id) REFERENCES student(id) ON UPDATE CASCADE,
  	FOREIGN KEY (course_id) REFERENCES course(id) ON UPDATE CASCADE
  );

  -- 模拟数据
  INSERT INTO `student` (name,age) VALUES('why',18);
  INSERT INTO `student` (name,age) VALUES('tom',22);
  INSERT INTO `student` (name,age) VALUES('lilei',25);
  INSERT INTO `student` (name,age) VALUES('lucy',16);
  INSERT INTO `student` (name,age) VALUES('lily',20);


  INSERT INTO `course` (name,price) VALUES('英语',100);
  INSERT INTO `course` (name,price) VALUES('语文',666);
  INSERT INTO `course` (name,price) VALUES('数学',888);
  INSERT INTO `course` (name,price) VALUES('历史',80);
  INSERT INTO `course` (name,price) VALUES('地理',888);
  INSERT INTO `course` (name,price) VALUES('物理',333);

  INSERT INTO `student_select_course` (student_id,course_id) VALUES(1,1);
  INSERT INTO `student_select_course` (student_id,course_id) VALUES(1,3);
  INSERT INTO `student_select_course` (student_id,course_id) VALUES(1,4);


  INSERT INTO `student_select_course` (student_id,course_id) VALUES(3,2);
  INSERT INTO `student_select_course` (student_id,course_id) VALUES(3,4);


  INSERT INTO `student_select_course` (student_id,course_id) VALUES(5,2);
  INSERT INTO `student_select_course` (student_id,course_id) VALUES(5,3);
  INSERT INTO `student_select_course` (student_id,course_id) VALUES(5,4);




  -- 查询所有学生，选择了哪些课程
  SELECT stu.id AS stuId, stu.name stuName, stu.age stuAge,cs.id csId,cs.name csName,cs.price csPrice
    FROM `student` AS stu
  	JOIN `student_select_course` ssc ON stu.id = ssc.student_id
  	JOIN `course` cs ON ssc.course_id = cs.id;


  -- 查询所有学生的选课情况
  SELECT stu.id AS stuId, stu.name stuName, stu.age stuAge,cs.id csId,cs.name csName,cs.price csPrice
    FROM `student` AS stu
  	LEFT JOIN `student_select_course` ssc ON stu.id = ssc.student_id
  	LEFT JOIN `course` cs ON ssc.course_id = cs.id;



  -- 查询没有选课的学生
  SELECT stu.id AS stuId, stu.name stuName, stu.age stuAge,cs.id csId,cs.name csName,cs.price csPrice
    FROM `student` AS stu
  	LEFT JOIN `student_select_course` ssc ON stu.id = ssc.student_id
  	LEFT JOIN `course` cs ON ssc.course_id = cs.id
  	WHERE cs.id IS NULL;

  -- 查询没有被选的课程
  SELECT stu.id AS stuId, stu.name stuName, stu.age stuAge,cs.id csId,cs.name csName,cs.price csPrice
    FROM `student` AS stu
  	RIGHT JOIN `student_select_course` ssc ON stu.id = ssc.student_id
  	RIGHT JOIN `course` cs ON ssc.course_id = cs.id
  	WHERE stu.id IS NULL;


  -- 查询某一个学生的选课
  SELECT cs.id csId,cs.name csName,cs.price csPrice
    FROM `student` AS stu
  	LEFT JOIN `student_select_course` ssc ON stu.id = ssc.student_id
  	LEFT JOIN `course` cs ON ssc.course_id = cs.id
  	WHERE stu.name = 'why';
  ```

#### 对查询结果的处理

```sql
-- 将联合查询的结果转成对象(一对多) JSON_OBJECT
SELECT
	product.id AS id,
	product.title title,
	product.price price,
	JSON_OBJECT( 'id', brand.id, 'name', brand.name, 'website', brand.website ) AS obj
FROM
	`product`
	LEFT OUTER JOIN `brand` ON product.brand_id = brand.id;


-- 将联合查询的结果转成数组(多对多) JSON_OBJECT
SELECT
	stu.id id,stu.name name,stu.age age,
	JSON_ARRAYAGG(JSON_OBJECT( 'courseId', cs.id, 'courseName', cs.name, 'coursePrice', cs.price ))
FROM
	`student` AS stu
	LEFT JOIN `student_select_course` ssc ON stu.id = ssc.student_id
	LEFT JOIN `course` cs ON ssc.course_id = cs.id
	GROUP BY stu.id;
```

### DCL(数据控制语言)

对数据库、数据表的权限进行相关访问

---

## 示例

### 创建一个完整的表

```sql
create table if not exists `users`(
	id int primary key auto_increment,
    name varchar(20) not null,
    age int default 0,
    phoneNum varchar(20) unique,
    createdTime timestamp
);

create  table if not exists `product`(
    id int primary key auto_increment,
    brand varchar(20),
    title varchar(100) not null,
    price double not null,
    score decimal(2,1),
    voteCnt int,
    url varchar(100),
    pid int
    );
```
