# TODO
- 把表单加上label
- 表单正则
- 复用同一个的Button
- 把所有的path上的id改成Str后缀
- 判题机
- 排名的rank方式
- 导出excel
- 切出网站管理
- 权限
- 根据excel导入用户
    - 注册时不以@xx.com结尾，但是修改时必须要求
- 单点登录
- 把select的setValue改为parseint

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# React Codemirror
[https://uiwjs.github.io/react-codemirror/](https://uiwjs.github.io/react-codemirror/)


# Sweet Alert
[https://sweetalert2.github.io/#declarative-templates](https://sweetalert2.github.io/#declarative-templates)

# react-toastify
[https://fkhadra.github.io/react-toastify/introduction/](https://fkhadra.github.io/react-toastify/introduction/)

# 权限模型
- 一个用户拥有多个角色(在不同的域有不同的角色，但每个用户在每个域只能有一个角色)
- 所有域的权限统一，设为acl

# Detail
- 使用reactjs + postgresql 16 + jwt + Docker
- websocket就用socketio了，有点问题

# icon
[vscode系列icon](https://react-icons.github.io/react-icons/icons/vsc/)

# WangEditor
有点问题，需要让他在初次时没有渲染，然后useEffect拿到数据后再重新渲染一次，这样就不会出问题。问题指刷新后报错`Uncaught (in promise) Error: Cannot resolve a DOM node from Slate node: {"text":"4123412341"}`