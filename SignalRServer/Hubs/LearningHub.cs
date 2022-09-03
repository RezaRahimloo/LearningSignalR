using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRServer.Hubs
{
    public class LearningHub : Hub<ILearningHubClient>
    {
        public async Task BroadcastMessage(string message)
        {
            await Clients.All.ReceiveMessage(message);
        }
        public async Task SendToOthers(string message)
        {
            await Clients.Others.ReceiveMessage(message);
        }
        public async Task SendToSelf(string message)
        {
            await Clients.Caller.ReceiveMessage(message);
        }
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
    
}