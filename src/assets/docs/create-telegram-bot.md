## **👉 1. Create a Telegram Bot**

### **Step 1: Talk to BotFather**

To create a Telegram bot, you need to interact with **BotFather**:

1. Open Telegram and search for `@BotFather`.
2. Start a chat and send the command:
```aiignore
/newbot
```
3. Follow the prompts:
- Choose a **name** for your bot.
- Choose a **username** (must end with `bot`, e.g., `MySampleBot`).
4. **Copy the API token** given by BotFather and the username. You will use this later.

## **👉 2. Create Telegram Configuration **

To configure a telegram bot in ludwig, you need to login to Ludwig

1. From the top left menu (click the hamburger) select Config.
2. On the top right of the screen select new and from the dropdown choose Telegram. 
3. You should see a screen similar to the below
4. ![Telegram Bot config](images/configure-telegram-bot.png "Telegram Bot config")
5. Replace YOUR_TELEGRAM_TOKEN and YOUR_USERNAME with the token and username from Botfather.
6. Click save.

## **👉 3. Add a telegram trigger to an Application flow.  **

To add a telegram Trigger to an Application flow 

1. From the top left menu (click the hamburger) select Application.
2. 
