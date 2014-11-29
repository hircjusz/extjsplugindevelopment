using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ExtJsPlugins
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Ext", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Clock",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Ext", action = "Clock", id = UrlParameter.Optional }
            );
        }
    }
}