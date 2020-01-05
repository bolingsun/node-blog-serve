# node-elm 接口文档
```

baseUrl: https://hocalhost:3000/

```


## 接口列表：

### 1、获取验证码

#### 请求URL:  
```
/user/getCaptcha
```

#### 请求方式: 
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|type      |N       |string  | |

#### 返回示例：

```javascript
图片base64
```

### 2、系统用户注册

#### 请求URL:  
```
/auth/local/signup
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|email      |Y       |string  | 邮箱 |
|password      |Y       |string  | 密码 |

#### 返回示例：

```javascript
{
    "status": 1,
    "message": "注册成功"
}
```

### 3、系统用户登录

#### 请求URL:  
```
/auth/local/login
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|email      |Y       |string  | 邮箱 |
|password      |Y       |string  | 密码 |

#### 返回示例：

```javascript
{
    "status": 1,
    "message": "登录成功",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

### 4、用户登录后获取个人信息

#### 请求URL:  
```
/user/getInfo
```

#### 请求方式: 
```
get
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|token      |Y       |string  | 需要在请求头Authorization赋值 Bearer token值 |

#### 返回示例：

```javascript
{
  "status": 1,
  "data": {
      "role": "user",
      "email": "123456@qq.com",
      "likes": [],
      "provider": "local"
  }
}
```

### 5、普通用户注册

#### 请求URL:  
```
/user/register
```

#### 请求方式: 
```
get
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string  | 用户名, 不能与数据库中已存在数据冲突|
|email      |Y       |string  | 用户邮箱, 不能与数据库中已存在数据冲突 |
|password      |Y       |string  | 密码 |

#### 返回示例：

```javascript
{
    "status": 1,
    "message": "注册成功",
    "user_id": "5e047f0ce862981008597673"
}
```

### 6、单张图片上传

#### 请求URL:  
```
/upload
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|file      |Y       |formdata | 上传文件name|

#### 返回示例：

```javascript
{
    "status": 1,
    "data": "http://xxx.xxx.jpg"
}
```

### 7、文章新增

#### 请求URL:  
```
/article/addArticle
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|title      |Y       |string | 文章标题|
|content      |Y       |string | 文章内容|

#### 返回示例：

```javascript
{
    "status": 1,
    "article_id": "5e105dd5e9f2cd12248cd424",
    "message": "新增成功"
}
```

### 8、文章列表查询（前台）

#### 请求URL:  
```
/article/addArticle?currentPage=1&pageSize=3
```

#### 请求方式: 
```
GET
```

#### 参数类型：params

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|currentPage      |N       |number | 当前页,默认值1|
|pageSize      |N       |number | 分页大小, 默认值10|

#### 返回示例：

```javascript
{
    "status": 1,
    "data": [
        {
            "visit_count": 1,
            "comment_count": 0,
            "like_count": 1,
            "_id": "5e09707129eb7300dc5725db",
            "title": "我是测试文章标题啊3",
            "publish_time": "2019-12-30T03:35:13.331Z"
        },
        {
            "visit_count": 1,
            "comment_count": 0,
            "like_count": 1,
            "_id": "5e09cf31d2603f1b883e7039",
            "title": "我是测试文章标题啊4",
            "publish_time": "2019-12-30T10:19:29.727Z"
        },
        {
            "visit_count": 1,
            "comment_count": 0,
            "like_count": 1,
            "_id": "5e09de32ceb5ac432892207b",
            "title": "我是标题",
            "publish_time": "2019-12-30T11:23:30.870Z"
        }
    ],
    "total": 7
}
```