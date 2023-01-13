from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("Web socket initialized")
        self.room_group_name = "test-room"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
    
    async def receive(self, text_data=None, bytes_data=None):
        print("message received:::: ", text_data)
        print("message type received:::: ", type(text_data))
        receive_data = json.loads(text_data)
        message = receive_data['message']
        print(message)
        await self.channel_layer.group_send(self.room_group_name, {
                "type":'chat.message',
                "message":message
            })
    
    async def chat_message(self, event):
        message = event['message']    
        print("message sending to clioent " ,message)
        await self.send(text_data=json.dumps({
            'message':message
        }))
    
    async def disconnect(self, code):
        print("web socket disconecxted")
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)


        