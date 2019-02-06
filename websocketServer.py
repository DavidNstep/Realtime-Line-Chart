#!/usr/bin/env python

# WS server that sends messages at random intervals

import asyncio
from datetime import datetime
import random
import websockets
import json
from random import randint


async def time(websocket, path):
    while True:
        now = datetime.utcnow().isoformat() + 'Z'
        message = json.dumps({ 'date' : datetime.now().strftime("%Y-%m-%d %H:%M:%S") , 'data' : randint(0, 100) })
        await websocket.send(message)
        await asyncio.sleep(3)


start_server = websockets.serve(time, '127.0.0.1', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()