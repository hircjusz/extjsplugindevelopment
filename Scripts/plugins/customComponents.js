Ext.onReady(function() {

    var myDiv1 = Ext.get('div1');

    //myDiv1.on('click', function() {
    //    myDiv1.setHeight(200);
    //});

    myDiv1.setSize(350, 350, { duration: 1, easing: 'bounceOut' });
    myDiv1.highlight();
    myDiv1.createChild('Child from a string');
    myDiv1.createChild('<div>Element from a string</div>');
    myDiv1.createChild({
        tag: 'div',
        html: 'Child from a config object'
    });
    myDiv1.createChild({
        tag: 'div',
        id: 'nestedDiv',
        style: 'border: 1px dashed; padding: 5px;',
        children: {
            tag: 'div',

            html: '...a nested div',
            style: 'color: #EE0000; border: 1px solid'
        }
    });

    var myTpl = Ext.create('Ext.Template', "<div>Hello {0}.</div>");
    myTpl.append(document.body, ['Marjan']);
    myTpl.append(document.body, ['Michael']);
    myTpl.append(document.body, ['Sebastian']);

    var myTpl2 = Ext.create('Ext.Template', [
        '<div style="background-color:{color};margin: 10px;">',
        '<b>Name :</b> {name} <br/>',
        '<b>Age :</b> {age} <br/>',
        '<b>DOB :</b> {dob} <br/>',
        '</div>'
    ]);

    myTpl2.compile();

    myTpl2.append(document.body, {
        color: '#E9e9FF',
        name: 'John Smith',
        age: '20',
        dob:'10/20/89'
    });

    myTpl2.append(document.body, {
        color: '#E9e9FF',
        name: 'Naomi White',
        age: '25',
        dob: '10/20/89'
    });

    var myTplData = [
        {
            color: '#E9e9FF',
            name: 'John Smith v2',
            age: '20',
            dob: '10/20/89',
            cars: ['Civic', 'Camry', 'S20000']
        },
         {
             color: '#E9e9FF',
             name: 'Naomi White v2',
             age: '25',
             dob: '10/20/89',
             cars:['Civic','Accord','Camry']
         }
    ];

    var myTplAdvanced = Ext.create('Ext.XTemplate', [
        '<tpl for=".">',
        '<div style="background-color:{color};margin:10px;"',
        '<b>Name :</b> {name} <br/>',
        '<b>Age :</b> {age} <br/>',
        '<b>DOB :</b> {dob} <br/>',
        '</div>',
        '</tpl>'
    ]);

    myTplAdvanced.compile();
    myTplAdvanced.append(document.body, myTplData);

    var myTplAdvCars = Ext.create('Ext.XTemplate', [
        '<tpl for=".">',
        '<div style="background-color:{color};margin:10px;"',
        '<b>Name :</b> {name} <br/>',
        '<b>Age :</b> {age} <br/>',
        '<b>DOB :</b> {dob} <br/>',
        '<b>Cars: </b>',
        '<tpl for="cars">',
        '{.}',
        '<tpl if="this.isCamry(values)">',
        '<b> (same car)</b>',
        '</tpl>',
         '{[(xindex<xcount? ",":"")]}',
        '</tpl>',
        '<br/>',
        '</div>',
        '</tpl>', {
            isCamry: function(car) {
                return car === 'Camry';
            }
        }
    ]);
    myTplAdvCars.compile();
    myTplAdvCars.append(document.body, myTplData);

    var myPanel = Ext.create('Ext.panel.Panel',{
        //xtype: 'panel',
        height: 100,
        width: 100,
        html: 'Hello!',
        renderTo: document.body,
        frame:true
    });

    Ext.define('mycustom.field1', {
        extend: 'Ext.Component',
        renderTo: document.body,
        renderTpl: '<input type="text">{name}</input>',
        data: { name: 'LeVeon' }
        //html:'custom component'
    });
    var myCustomComponent = Ext.create('mycustom.field1');

    //Ext.create('Ext.container.Viewport', {
    //    layout: 'border',
    //    items: [
    //        {
    //            height: 75,
    //            region: 'north',
    //            title: 'Does Santa live here?'
    //        },
    //        {
    //            width: 150,
    //            region: 'west',
    //            title: 'The west region rules'
    //        },
    //        {
    //            region: 'center',
    //            title: 'No, this region rules!'
    //        }
    //    ]
    //});


});