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