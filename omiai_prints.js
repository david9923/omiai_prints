
const fs = require('fs');
const { promisify } = require('util');
const webdriver = require('selenium-webdriver');
const { Builder, By, until } = webdriver;

const capabilities = webdriver.Capabilities.chrome();
capabilities.set('chromeOptions', {
    args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        `--window-size=1980,1200`
    ]
});

// awaitを使うので、asyncで囲む
(async () => {
    // ブラウザ立ち上げ
    const driver = await new Builder().withCapabilities(capabilities).build();
    // URLのサイトへ移動
    await driver.get("https://fb.omiai-jp.com/");
    // 1000で1sec
    await driver
        .findElement(By.className("login_btn")).click();

    await driver
        // .wait(until.elementLocated(By.className("om-button-border-black-S sign-in-via-sms")), 10000)
        .findElement(By.id("om-button-fb-login")).click();

    // ウィンドウハンドルを記録
    const tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[1]);

    // facebookログインページを取得
    // switch_window_by_title(driver, "Facebook");

//    await driver
//        // .get('')
//        .wait(until.elementLocated(By.id("loginbutton")), 10000)

    // メールアドレス入力
    await driver
        // .findElement(By.name("phone_number"))
        .findElement(By.name("email"))
        .sendKeys("246810ab90@gmail.com")

    // パスワード入力
    await driver
        // .findElement(By.name("phone_number"))
        .findElement(By.name("pass"))
        .sendKeys("246810KKi")

    // ログインボタンを押す
    await driver
        .findElement(By.className("uiButton uiButtonConfirm uiButtonLarge")).click();
    // .wait(until.elementLocated(By.className("_1wsoZ5fswvzAoNYvIJgrU4")), 10000)
    // 検索フォームに単語を入力
    // await driver
    //  .sendKeys("品川太郎")
    // 検索buttonのタグを取得
    //await driver
    //  .findElement(By.className("_63Ie6douiF2dG_ihlFTen rapid-noclick-resp")).click()
    //  .wait(until.elementLocated(By.className("SearchBox__searchInput js-SearchBox__searchInput")), 10000)
    // 検索結果を表示
    // sleep=待機処理
    // jawait driver
      // .sleep(3);
      // スラッシュ二つで前の要素まで飛ぶ
      // コピペするときはインサートモードではない状態でするのが吉
      // .findElement(By.xpath("//button[@aria-lavel='検索']")).click()

    // タブに戻る
    await driver.switchTo().window(tabs[0]);

//    // 写真が表示されるまで待機する
//    await driver
//      .wait(until.elementLocated(By.className("inner")), 10000);

    // const images = await driver.findElement(By.className("inner"));
    // await driver.findElement(By.xpath("//*[@id='om-search-index-content']/div[1]/div[10]/div/div[1]/div")).click();

    for (let i=1; i<200; i++) {

      // 写真が表示されるまで待機する
      const inner = await driver.wait(until.elementLocated(By.className("inner")), 10000);
      if (inner) {
        // javascriptスクロールする処理
          await driver.executeScript(
            "window.scrollTo(0, document.body.scrollHeight);"
          );
      }
      await driver.sleep(1000);

      // 一番最初の要素を取得する
      // await driver.findElement(By.className("inner")).click();
      // await driver.findElement(By.xpath("//*[@id='om-search-index-content']/div[1]/div[i]/div/div[1]/div")).click();
      const pics = await driver.findElements(By.className("inner"));
      await pics[i].click();

      // 写真が表示されるまで待機する
      await driver.wait(until.elementLocated(By.className("inner")), 10000);
      await driver.sleep(1000);

      // 足跡をつけた人のユーザー名を取得
      //const user_name = await driver.findElement(By.className("title"));
      //console.log(user_name+"さんに足跡をつけました！");
      console.log("足跡をつけた人数"+i+"人");

      await driver.sleep(1000);

      // ブラウザバック
      await driver.navigate().back();
      await driver.wait(until.elementLocated(By.className("inner")), 10000);
    }


    // 閉じるボタンを取得
//    await driver
//      // .findElement(By.xpath("//span[@class='om-remove btn-dialog-close']")).click();
//      .findElement(By.xpath("//*[@id='om-modal-member-detail']/nav/div/div/div[1]/span")).click();


    await driver.sleep(10000);
    // console.log(node.nextSibling)

//*[@id="om-search-index-content"]/div[1]/div[1]/div/div[1]/div
//*[@id="om-search-index-content"]/div[1]/div[1]/div/div[1]/div
//*[@id="om-search-index-content"]/div[1]/div[2]/div/div[1]/div
//*[@id="om-search-index-content"]/div[1]/div[3]/div/div[1]/div

//// 繰り返し処理の方法
//const cards = await driver.findElements(By.className('card'));
//const toIds = [];
//for(let i=0; i<cards.length; i++) {
//    // 受け取り主のプロフィール画像をクリック
//    await driver.wait(until.elementsLocated(By.className('card_picTo')), 10000);
//    const pics = await driver.findElements(By.className('card_picTo'));
//    await pics[i].click();
//
//    // 受け取り主のプロフィール画面にてIDを取得
//    await driver.wait(until.elementsLocated(By.className('ownProfile_uname')), 10000);
//    const toId = await driver.findElement(By.className('ownProfile_uname')).getText();
//    toIds.push(toId);
//
//    //ブラウザバック
//    await driver.navigate().back();
//    await driver.wait(until.elementsLocated(By.className('card_id'), 10000));
//}




    // ブラウザ終了
    await driver.quit();

})();

