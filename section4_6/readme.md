How to get start
====

#### Installation

```
npm i
npx sequelize db:migrate
npm run dev
```


#### How to use

- Open http://localhost:3000/ to find the main page of the application.
- Click record button and do some interaction then stop.
- You will get a UUID for the record, paste it like http://localhost:3000/?id={YOUR_RECORD_GUID} and turn into the view mode.
- If you want a fake button click, find the action in the replayMiddleware and change it.
I extract button click into action, so changing action means changing the behavior of button.
But I wonder if the assignment wants to emit a "real click" on button, then it'll need another design.
I don't design this part completely, Practice your own.
- Open http://localhost:3000/dashboard.html for monitoring test_run.
I'm not sure this is what the assignment pointed as the "test".
You should try to post your test_run into db and call your socket in the save api.
I don't design this part completely, either. Practice your own.

