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