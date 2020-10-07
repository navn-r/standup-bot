# Standup Bot :robot:

Discord bot for Scrum daily standups

**_TODO:_**

1. Assign Bot to *one* specific channel in a server **OR** create new channel and restrict access to bot messages only
   - Note that all users in that channel would be part of the standup

2. Set assigned standup time (default 11:00 EST) and messaging timeout (default 10 minutes)

3. Send Description of bot in assigned server channel
    ```
    Hi! I'm Stan D. Upbot :robot: and I will be facillitating the daily standups from now on. :tada:
    The way I work is the following:
        1. Private Message me with `init` at the assigned standup time
        2. I will provide you the prompt, and your next message will be your response
        3. I will save that message
        4. 10/15 minutes after the assigned standup time I will display everyones message in my channel for all to see :heart:
    ```
   
4. Allow Bot to Private DM User with standup prompt
    ``` 
    1. What have you done since yesterday?
    2. What are you planning on doing today?
    3. Any impediments or stumbling blocks?
    ```

5. Store User prompt response in Database (MongoDB)
   ```json
    {
        "userId" : "🅱avn#7714",
        "serverId": "serverid123593012",
        "date": "10/07/2020:11:00EST",
        "message": "1. ... \n 2. ... \n 3. ..."
    }
   ```

6. Check if timeout has been reached 
   
7. Collect all required user messages for the day for the specifc server
   
8. Post to the assigned channel