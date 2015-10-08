
Ext.onReady(function () {


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
                type:'json'
            }
        }
    });

    var mySession1 = Ext.create('SessionModel', {
        title: 'C++',
        sessionLevel: 3
    });

    if (!mySession1.isValid()) {

        var errors = mySession1.validate();
        errors.each(function (rec) {
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


   var store1= Ext.create('Ext.data.Store', {
       model: 'SessionModel',
        data: [
           mySession1
        ]
   });

    //store1.commitChanges();
    store1.save();

});