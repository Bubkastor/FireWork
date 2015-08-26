using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace FireworksServer
{
    public class ClientHub: Hub
    {
        public static List<string> Users = new List<string>();

        public void Send(float x, float y)
        {
            Clients.All.broadcastMessage(x, y);
        }

        public void Send(int count)
        {
            // Call the addNewMessageToPage method to update clients.
            var context = GlobalHost.ConnectionManager.GetHubContext<ClientHub>();
            context.Clients.All.updateUsersOnlineCount(count);
        }

        public override System.Threading.Tasks.Task OnConnected()
        {
            string clientId = GetClientId();

            if (Users.IndexOf(clientId) == -1)
            {
                Users.Add(clientId);
            }

            // Send the current count of users
            Send(Users.Count);

            return base.OnConnected();
        }



        public override System.Threading.Tasks.Task OnReconnected()
        {
            string clientId = GetClientId();
            if (Users.IndexOf(clientId) == -1)
            {
                Users.Add(clientId);
            }

            // Send the current count of users
            Send(Users.Count);

            return base.OnReconnected();
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            string clientId = GetClientId();

            if (Users.IndexOf(clientId) > -1)
            {
                Users.Remove(clientId);
            }

            // Send the current count of users
            Send(Users.Count);

            return base.OnDisconnected(stopCalled);
        }

        private string GetClientId()
        {
            string clientId = "";
            if (Context.QueryString["clientId"] != null)
            {
                // clientId passed from application 
                clientId = this.Context.QueryString["clientId"];
            }

            if (string.IsNullOrEmpty(clientId.Trim()))
            {
                clientId = Context.ConnectionId;
            }

            return clientId;
        }

    }
}