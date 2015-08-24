using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace FireworksServer
{
    public class ClientHub: Hub
    {
        public void Send(string name, string message)
        {
            Clients.All.broadcastMessage(name, message);
        }
        public void SendCoord(int x, int y)
        {
            Clients.All.broadcastMessage(x, y);
        }
    }
}