using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace FireworksServer
{
    public class ClientHub: Hub
    {
        public void Send(float x, float y)
        {
            Clients.All.broadcastMessage(x, y);
        }

    }
}