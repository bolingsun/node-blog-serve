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

### 3、系统用户登录(普通用户也可使用该接口登录))

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


### 7、单张图片删除

#### 请求URL:  
```
/upload/delete
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|name      |Y       |string | 要删除文件name,带拓展名|

#### 返回示例：

```javascript
{
    "status": 1,
    "message": "删除文件成功"
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

### 文章删除(admin)

#### 请求URL:  
```
/article/delete
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string | 文章id|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "message": "删除成功"
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

### 获取文章详情（前台）

#### 请求URL:  
```
/article/adminArticleDetail
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
        "_id": "5e114d4dc1e2084494859020",
        "title": "我是测试文章2",
        "brief": "我是简介描述a",
        "cover_img": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "content" : "文章内容测试",
        "tags":[],
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
|id      |Y       |string | 文章id|
|title      |Y       |string | 文章标题|
|content      |Y       |string | 文章内容|
|brief      |N      |string | 文章简介|
|cover_img      |N       |string | 文章封面图片|
|tags      |N       |Array | tag标签id数组|


#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "message": "更新成功",
    "article_id": "5e114d4dc1e2084494859020"
}
```

### 评论新增

#### 请求URL:  
```
/comment/addComment
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|articleId      |Y       |string | 文章id|
|content      |Y       |string | 评论内容|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "data": {
        "status": 1,
        "_id": "5e11854081e948504cc60ab8",
        "article_id": "5e114d4dc1e2084494859020",
        "content": "我是new comment内容",
        "user_id": {
            "_id": "5e048000663b2b350cd859ea"
        },
        "replys": [],
        "created": "2020-01-05T06:42:08.411Z",
        "updated": "2020-01-05T06:42:08.411Z",
        "__v": 0
    }
}
```

### 评论列表

#### 请求URL:  
```
/comment/commentList?id=5e114d4dc1e2084494859020
```

#### 请求方式: 
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string | 文章id|

#### 返回示例：

```javascript
{
    "status": 1,
    "data": [
        {
            "status": 1,
            "_id": "5e11854081e948504cc60ab8",
            "article_id": "5e114d4dc1e2084494859020",
            "content": "我是new comment内容",
            "user_id": {
                "_id": "5e048000663b2b350cd859ea",
                "username": "user2",
                "avatar": "xxx.jpg",
            },
            "replys": [
                {
                    "_id": "5e1190325286b03be84765df",
                    "content": "你这个评论批量",
                    "user_info": {
                        "id": "5e047f0ce862981008597673",
                        "username": "user2"
                    },
                    "created": "2020-01-05T07:28:50.515Z"
                }
            ],
            "created": "2020-01-05T06:42:08.411Z",
            "updated": "2020-01-05T06:42:08.411Z",
            "__v": 0
        }
    ]
}
```
### 评论回复

#### 请求URL:  
```
/comment/addReply
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string | 评论父id|
|content      |Y       |string | 评论回复内容|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "message": "回复成功",
    "data": [
        {
            "_id": "5e1190325286b03be84765df",
            "content": "你这个评论批量",
            "user_info": {
                "id": "5e047f0ce862981008597673",
                "username": "user2"
            },
            "created": "2020-01-05T07:28:50.515Z"
        },
        {
            "_id": "5e119083bce6b62ed443475a",
            "content": "你这个评论good",
            "user_info": {
                "id": "5e047f0ce862981008597673",
                "username": "user2"
            },
            "created": "2020-01-05T07:30:11.737Z"
        }
    ]
}
```
### 删除评论回复内容（admin）

#### 请求URL:  
```
/comment/deleteReply
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|commentId      |Y       |string | 评论id|
|replyId      |Y       |string | 回复内容ID|

#### 返回示例：

```javascript
{
     "status": 1,
    "success": true,
    "message": "删除回复成功",
    "data": {
        "status": 1,
        "_id": "5e11894781e948504cc60aba",
        "article_id": "5e114d4dc1e2084494859020",
        "content": "我是new comment内容2 admin",
        "user_id": "5e048000663b2b350cd859ea",
        "replys": [
            {
                "_id": "5e119083bce6b62ed443475a",
                "content": "你这个评论good",
                "user_info": {
                    "id": "5e047f0ce862981008597673",
                    "username": "user2"
                },
                "created": "2020-01-05T07:30:11.737Z"
            }
        ],
        "created": "2020-01-05T06:59:19.851Z",
        "updated": "2020-01-05T06:59:19.851Z",
        "__v": 0
    }
}
```
### 删除评论（admin）

#### 请求URL:  
```
/comment/deleteComment
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string | 评论id|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "message": "删除评论成功"
}
```

### 添加标签分类（admin）

#### 请求URL:  
```
/tags/addTagClass
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|name      |Y       |string | 标签分类名称|
|remark      |N       |string | 标签分类描述说明|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "catId": "5e12a158b50f522e4ccc3674",
    "message": "新增标签分类成功"
}
```

### 获取标签分类列表（admin）

#### 请求URL:  
```
/tags/tagClassList
```

#### 请求方式: 
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|      |       | | |

#### 返回示例：

```javascript
{
    "status": 1,
    "data": [
        {
            "_id": "5e12a158b50f522e4ccc3674",
            "name": "体育",
            "__v": 0
        }
    ]
}
```

### 更新标签分类（admin）

#### 请求URL:  
```
/tags/updateTagClass
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string | 标签分类id|
|name      |N       |string | 标签分类名称|
|remark      |N       |string | 标签分类描述说明|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "catId": "5e12a4404d5d8e5338365475",
    "message": "更新标签分类成功"
}
```

### 删除标签分类（admin）

#### 请求URL:  
```
/tags/deleteTagClass
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string | 标签分类id|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "message": "删除分类成功"
}
```

### 新增标签（admin）

#### 请求URL:  
```
/tags/addTag
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|classId      |Y       |string | 标签分类id|
|name      |Y       |string | 标签名称, 唯一，不能重复|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "tag_id": "5e12a5a14d5d8e5338365476",
    "message": "新增标签成功"
}
```

### 获取标签列表（admin）

#### 请求URL:  
```
/tags/tagList
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|classId      |N       |string | 标签分类id,不传分类id,就说全部查询,传参,就说条件查询|

#### 返回示例：

```javascript
{
    "status": 1,
    "data": [
        {
            "is_index": false,
            "is_show": false,
            "sort": 1,
            "_id": "5e12a5a14d5d8e5338365476",
            "name": "NBA",
            "__v": 0
        }
    ]
}
```

### 删除标签（admin）

#### 请求URL:  
```
/tags/deleteTag
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string | 标签id|

#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "message": "删除标签成功"
}
```


### 更新标签（admin）

#### 请求URL:  
```
/tags/updateTag
```

#### 请求方式: 
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string | 标签id|
|name      |N       |string | 标签名称|
|is_show      |N       |Bollean | 是否显示|


#### 返回示例：

```javascript
{
    "status": 1,
    "success": true,
    "tag_id": "5e12a5a14d5d8e5338365476",
    "message": "更新标签成功"
}
```

### 前台获取标签列表

#### 请求URL:  
```
/tags/frontTagList
```

#### 请求方式: 
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|      |       |  |  |

#### 返回示例：

```javascript
{
    "status": 1,
    "data": [
        {
            "is_index": false,
            "is_show": true,
            "sort": 1,
            "_id": "5e12a5a14d5d8e5338365476",
            "name": "NBA好",
            "__v": 0
        }
    ]
}
```