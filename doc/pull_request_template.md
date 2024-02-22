# CODE STANDARD:
- Use parameterized SQL queries -> See: https://stackoverflow.com/questions/775296/mysql-parameterized-queries
- If using a sync library like Request on the backend, the call itself is not `async`
- If using a sync library add to a thread pool as mentioned 
`
from fastapi import FastAPI
from fastapi.concurrency import run_in_threadpool
from my_sync_library import SyncAPIClient 
app = FastAPI()
@app.get("/")
async def call_my_sync_library():
    my_data = await service.get_my_data()
    client = SyncAPIClient()
    await run_in_threadpool(client.make_request, data=my_data)`
from here: https://github.com/zhanymkanov/fastapi-best-practices#23-if-you-must-use-sync-sdk-then-run-it-in-a-thread-pool

- The component logic of a module (e.g. StudentModule, UserModule) does not include other HOC, as those are include in a page (e.g. StudentPage)
