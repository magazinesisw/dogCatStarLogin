class PlaywrightHelper {
  constructor(page) {
      this.page = page; // Playwright 的页面对象
  }
  /**
   * 根据选择器类型和标识符获取定位器
   */

  async fillInput(text,value){
      //找到页面上第一个占位符为 "請輸入" 的输入框，并向其中填入密码。
      await this.page.getByPlaceholder(text).first().waitFor();
      await this.page.getByPlaceholder(text).first().fill(value);

  }
  async getByRoleAndClick(role , options) {

      await this.page.getByRole(role, { name: options }).waitFor();
      await this.page.getByRole(role, { name: options }).click();


  }



  //提交逻辑哪里有点问题，需要等待内部逻辑触发，我就写了一个小循环
    async getButtonArrive(text,value){
      while (true) {
          await this.page.waitForTimeout(2000)
          const button = await this.page.getByRole(text, { name: value });
          console.log(button);
          const isVisible = await button.isVisible();
          console.log(isVisible);

          // 如果按钮可见，则点击并跳出循环
          if (isVisible) {
              await button.click();
              break; // 跳出循环
          }

      }
  }

  //这里是弹窗有时不出现，所以我写了一个判断
    async windowSelect(text, value) {
        // 获取指定 role 和 name 的元素
        const eElement = await this.page.getByRole(text, { name: value });

        let isVisible = false;
        try {
            // 检查元素是否可见
            isVisible = await eElement.isVisible();
        } catch (e) {
            // 如果捕获到错误，表示元素不可见或不存在
            console.log("未找到元素");
        }
        // 如果元素可见，则点击
        if (isVisible) {
            console.log("区域弹窗");
            await this.getByRoleAndClick(text, value);
        }
        // 如果不可见，什么也不做
    }














}



































module.exports = PlaywrightHelper;
