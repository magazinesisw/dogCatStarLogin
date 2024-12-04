
//记录:第一次接触 “类” 这个概念
//在go没有继承，多态的概念，其中一般直接struct和interface，封装方法则直接func(),还在摸索中
//面向过程编程和面向对象编程的区别确实还是挺大的
//TODO:这里我尝试抽出操作，然后再case中不需要去写这么繁琐的东西
const { test, expect } = require('@playwright/test');
const Playwrightpage = require('../utils/PageActions.js'); // 工具类





class LoginPage {
    constructor(page) {
        // page 是 Playwright 的 Page 对象，代表了当前的浏览器页面
        this.base = new Playwrightpage(page);
    }

    async open(loginURL) {
        try {
            if (!loginURL) {
                throw new Error("yml文件中缺失对象");
            }

            await this.base.page.goto(loginURL, { waitUntil: 'domcontentloaded' });

            console.log(`已成功打开登录页面: ${loginURL}`);
        } catch (error) {
            throw new Error("打开地址失败");
        }
    }

    async login_page(username, password) {

        //区域弹窗判断
        await  this.base.windowSelect('button','確定前往');


        await  this.base.getByRoleAndClick('button','使用 電子信箱 登入');
        console.log('执行点击电子邮箱登录成功')


        console.log(`登录名称: ${username}`);
        await this.base.fillInput("請輸入",username);
        //this.config.loginTestCases.username
        console.log('输入邮箱成功');


        console.log("提交账号")
        await  this.base.getButtonArrive('button','確認');
        console.log("点击事件触发成功")



        console.log("密码登录触发")
        await  this.base.getByRoleAndClick('button','密碼登入');
        await this.base.fillInput("請輸入",password);
        //this.config.loginTestCases.password
        console.log("密码登录")
        await this.base.getByRoleAndClick('button','確認');
        await this.base.page.waitForTimeout(10000); // 等待 10 秒,让视频加载有个清晰的过程。这里只是为了demo的可见性，作为调试用
    }
}



module.exports = LoginPage;









