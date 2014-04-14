using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExtJsPlugins.Controllers
{
    public class ExtController : Controller
    {
        //
        // GET: /Ext/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Ext/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Ext/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Ext/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Ext/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Ext/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Ext/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Ext/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
