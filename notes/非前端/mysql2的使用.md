# TS中mysql2和sequelize

## mysql2的优势(相比mysql)

- 更好更快的性能
- Prepared Statement(预编译语句):
  - 提高性能
  - 防止SQL注入
- 支持Promise

## mysql2基本使用

#### 基本使用

```ts
// @ts-ignore
import mysql from "mysql2";

const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "test",
  user: "root",
  password: "*******",
});

const sqlString = `
    SELECT *
    FROM product
    WHERE price > 7000;
`;
conn.query(sqlString, (err, results, fields) => {
  console.log(results);
  conn.end(); // 结束连接，通过on捕获错误
  conn.destroy(); // 销毁
});
```

#### 预处理语句

```ts
const sqlString = `
    SELECT *
    FROM product
    WHERE price > ?
      AND score > ?;
`;
conn.query(sqlString, [7000, 7], (err, results, fields) => {
  console.log((results as any[]).length);
  conn.end(); // 结束连接，通过on捕获错误
});
```

#### 连接池

```ts
//创建连接池
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "test",
  user: "root",
  password: "*********",
  connectionLimit: 10, // 最大连接数
});
pool.execute(sqlString, (err, results, fields) => {});
```

#### promise用法

```ts
pool
  .promise()
  .execute(sqlString)
  .then(([results, fields]) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Sequelize

[git地址(含文档)](https://github.com/sequelize/sequelize)

### ORM(对象映射关系)

- ORM是一种程序设计方案，使用虚拟对象数据库的效果，在java中表现为Hibernate、MyBatis

- Node中主要使用Sequelize

#### Sequelize的使用

- 基本使用

  ```ts
  import { DataTypes, Model, Sequelize } from "sequelize";

  const sequelize = new Sequelize("test", "root", "*********", {
    host: "localhost",
    dialect: "mysql",
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("数据库连接成功");
    })
    .catch((err: any) => {
      console.log(`数据库连接失败`, err);
    });

  // 定义ORM
  class Product extends Model {}

  class Brand extends Model {}

  Brand.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: DataTypes.STRING,
      phoneRank: DataTypes.INTEGER,
    },
    {
      tableName: "brand",
      createdAt: false,
      updatedAt: false,
      sequelize,
    },
  );

  // 初始化ORM
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: DataTypes.DOUBLE,
      score: DataTypes.DOUBLE,
      brandId: {
        field: "brand_id",
        type: DataTypes.INTEGER,
        references: {
          model: Brand,
          key: "id",
        },
      },
    },
    {
      tableName: "product",
      createdAt: false,
      updatedAt: false,
      sequelize,
    },
  );

  // 将两张表联系在一起
  Product.belongsTo(Brand, {
    foreignKey: "brandId",
  });

  const queryProduct = async () => {
    // // 查询数据
    // let result = await Product.findAll({
    //     where: {
    //         price: {[Op.gt]: 5000}
    //     }
    // })
    // console.log(result)

    // // 插入数据
    // let result = await Product.create({
    //     title: 'nova',
    //     price: 8888,
    //     score: 5.5
    // })
    // console.log(result)

    // 更新数据
    let result = await Product.update(
      {
        title: "nova5",
        price: 6888,
        score: 7.5,
      },
      { where: { id: 1 } },
    );
    console.log(result);
  };

  const queryProducts = async () => {
    const result = await Product.findAll({
      include: {
        model: Brand,
      },
    });
    console.log(result);
  };
  queryProducts().then();
  ```

- 多对多示例

  ```ts
  import { DataTypes, Model, Sequelize } from "sequelize";

  const sequelize = new Sequelize("test", "root", "*********", {
    host: "localhost",
    dialect: "mysql",
  });

  // 创建实例
  class Student extends Model {}

  class Course extends Model {}

  class StudentCourse extends Model {}

  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: DataTypes.INTEGER,
    },
    {
      tableName: "student",
      createdAt: false,
      updatedAt: false,
      sequelize,
    },
  );

  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: DataTypes.INTEGER,
    },
    {
      tableName: "course",
      createdAt: false,
      updatedAt: false,
      sequelize,
    },
  );

  StudentCourse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studentId: {
        field: "student_id",
        type: DataTypes.STRING,
        references: {
          model: Student,
          key: "id",
        },
      },
      courseId: {
        field: "course_id",
        type: DataTypes.STRING,
        references: {
          model: Course,
          key: "id",
        },
      },
    },
    {
      tableName: "student_select_course",
      createdAt: false,
      updatedAt: false,
      sequelize,
    },
  );

  // 多对多的联系
  Student.belongsToMany(Course, {
    through: StudentCourse,
    foreignKey: "studentId",
    otherKey: "courseId",
  });

  Course.belongsToMany(Student, {
    through: StudentCourse,
    foreignKey: "courseId",
    otherKey: "studentId",
  });

  const queryStudent = async () => {
    const res = await Student.findAll({
      include: { model: Course },
    });
    console.log(res);
  };
  queryStudent().then();
  ```
