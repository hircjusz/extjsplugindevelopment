
Ext.onReady(function () {


    var sessionModelProxy = function() {
        Ext.define('SessionModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'id', type: 'int' },
                { name: 'title', type: 'string' },
                { name: 'sessionLevel', type: 'int' },
                { name: 'approved', type: 'bool', defaultValue: false }
            ],
            validations: [
                { type: 'length', field: 'title', min: 3 },
                { type: 'inclusion', field: 'sessionLevel', list: [1, 2, 3] }
            ],
            proxy: {
                type: 'rest',
                url: 'CreateSession',
                reader: {
                    type: 'json'
                }
            }
        });

        var mySession1 = Ext.create('SessionModel', {
            title: 'C++',
            sessionLevel: 3
        });

        if (!mySession1.isValid()) {

            var errors = mySession1.validate();
            errors.each(function(rec) {
                console.log(rec);
            });
        }


        //mySession1.save({
        //    success: function(session) {
        //        var tmp= session.getData();
        //    }
        //});

        mySession1.beginEdit();
        mySession1.set('title', 'Darek');
        var changes1 = mySession1.getChanges();
        mySession1.endEdit();
        var changes2 = mySession1.getChanges();
        //mySession1.commit();
        mySession1.set('title', 'Darek2');


        var mySession2 = Ext.create('SessionModel', {
            title: 'C#',
            sessionLevel: 3
        });


        var store1 = Ext.create('Ext.data.Store', {
            model: 'SessionModel',
            data: [
                mySession1
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        //store1.commitChanges();
        store1.save();
        store1.load();
    };

    var customStoreProxy = function() {

      var store =  Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: [
                { name: 'item_code', type: 'string' },
                { name: 'quantity', type: 'int' },
                { name: 'description', type: 'string' }
            ],
            storeId: 'summary',
            proxy: {
                type: 'ajax',
                actionMethods: 'POST',
                extraParams: { 'filter': 'branch', 'branch': location },
                url: 'GetRecordsCustomProxy',
                reader: {
                    type: 'json',
                    root: 'data'
                },
                /*
                * override Ext Ajax Proxy doRequest method
                * must be maintained when Ext library is updated in the app
                */
                doRequest: function (operation, callback, scope) {
                    var writer = this.getWriter(),
                        request = this.buildRequest(operation, callback, scope);

                    if (operation.allowWrite()) {
                        request = writer.write(request);
                    }

                    Ext.apply(request, {
                        headers: this.headers,
                        timeout: this.timeout,
                        scope: this,
                        callback: this.createRequestCallback(request, operation, callback, scope),
                        method: this.getMethod(request),
                        disableCaching: false // explicitly set it to false, ServerProxy handles caching
                    });

                    /*
                    * do anything needed with the request object
                    */
                    console.log('request', request);
                    console.log('request.params', request.params);

                    Ext.Ajax.request(request);

                    return request;
                }
            }
        });

        store.load();
    };
    customStoreProxy();

});