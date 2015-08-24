using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using FireworksServer;
[assembly: OwinStartup(typeof(FireworksServer.Startup1))]

namespace FireworksServer
{
    public class Startup1
    {
        public void Configuration(IAppBuilder app)
        {
            // Дополнительные сведения о настройке приложения см. по адресу: http://go.microsoft.com/fwlink/?LinkID=316888
            app.MapSignalR();
        }
    }
}
