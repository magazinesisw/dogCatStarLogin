const { test,expect } = require('@playwright/test');
const LoginPage = require('../Business_modules/loginPageMailBox');
const loadYaml = require('../utils/loadYaml'); // 加载 YAML 的工具


test('case1：已设置密码的用户通过邮箱账号密码登录系统',async({page}) => {
     const  config = loadYaml('./configs/login.yml');
    const loginPage = new LoginPage(page);


    // 向上一级目录，然后进入configs文件夹
    await loginPage.open(config.loginURL);
    await loginPage.login_page(config.loginTestCases.username,config.loginTestCases.password);


    //断言登录人
    await expect(page).toHaveURL(config.loginTestCases.expectedURL);
    const userNameElement = page.locator(`h2:text("${config.loginTestCases.expectedUserName}")`);
    const userNameText = await userNameElement.textContent();
    console.log('获取到的用户名:', userNameText);
    await expect(userNameElement).toContainText(config.loginTestCases.expectedUserName);

    //断言页面元素
    const pageTitle = page.locator('text="會員中心"');
    await expect(pageTitle).toContainText(config.loginTestCases.expectedResult);


    //断言cookie值 获取当前cookie中的登录值,因为playwright是无缓存的所以，只要当前cookie中有了这个值就说明成功了
    const cookies = await page.context().cookies();
    const targetCookie = cookies.find(cookie => cookie.name === 'wordpress_sec_89eb7c3f9afc96a9b7d5ef164a83679d');
    if (targetCookie) {
        console.log('Cookie Value:', targetCookie.value);
    } else {
        console.log('Cookie not found');
    }

    
})