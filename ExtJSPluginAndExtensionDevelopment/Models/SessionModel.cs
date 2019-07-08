using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExtJsPlugins.Models
{
    public class SessionModel
    {
            public int id { get; set; }
            public string title { get; set; }
            public int sessionLevel { get; set; }
            public bool approved { get; set; }

    }
}