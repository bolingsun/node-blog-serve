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

### 文章新增

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
|brief      |N      |string | 文章简介|
|cover_img      |N       |string | 文章封面图片|

#### 返回示例：

```javascript
{
    "status": 1,
    "article_id": "5e105dd5e9f2cd12248cd424",
    "message": "新增成功"
}
```

### 文章列表查询（后台）

#### 请求URL:  
```
/article/adminArticleList?currentPage=1&pageSize=3
```

#### 请求方式: 
```
GET
```

#### 参数类型：query

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
            "brief": "",
            "cover_img": "",
            "tags": [],
            "visit_count": 1,
            "comment_count": 0,
            "like_count": 1,
            "top": false,
            "status": 0,
            "_id": "5e114b5f86c0bf230cbe16be",
            "title": "我是测试文章1",
            "created": "2020-01-05T02:35:11.443Z",
            "publish_time": "2020-01-05T02:35:11.443Z",
            "updated": "2020-01-05T02:35:11.443Z",
            "__v": 0
        }
    ],
    "total": 7
}
```

### 文章列表查询（前台）

#### 请求URL:  
```
/article/articleList?currentPage=1&pageSize=3
```

#### 请求方式: 
```
GET
```

#### 参数类型：query

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

### 获取文章详情（前台）

#### 请求URL:  
```
/article/articleDetial?id=123456
```

#### 请求方式: 
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |number | 文章查询id|

#### 返回示例：

```javascript
{
     "status": 1,
    "data": {
        "_id": "5e114d4dc1e2084494859020",
        "title": "我是测试文章2",
        "brief": "我是简介描述a",
        "cover_img": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "content" : "文章内容测试",
        "visit_count": 2,
        "comment_count": 0,
        "like_count": 1,
        "publish_time": "2020-01-05T02:43:25.346Z"
    }
}
```

### 文章喜欢与不喜欢切换（前台，需要登录）

#### 请求URL:  
```
/article/toggleLike
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |number | 文章查询id|

#### 返回示例：

```javascript
{
    "status": 1,
    "data": {
        "count": 2, // 查询文章目前喜欢人数
        "isLike": true // 该文章目前用户喜欢与否的状态
    }
}
```

### 文章更新（后台）

#### 请求URL:  
```
/article/updateArticle
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
|brief      |N      |string | 文章简介|
|cover_img      |N       |string | 文章封面图片|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "message": "更新成功",
    "article_id": "5e114d4dc1e2084494859020"
}
```