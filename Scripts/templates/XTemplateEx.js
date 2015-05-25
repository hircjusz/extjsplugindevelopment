Ext.onReady(function () {

    var t = new Ext.XTemplate(
   "The robot overlords from planet {planetName} have declared that as ",
   "of this time, no human may acquire the following items:<br><ul>",
   "<tpl for=\"bannedItems\">",
   "<li>{itemName} - Reason: {noReason}</li>",
   "</tpl>",
   "</ul>"
   );

    var vals = Ext.query("div[id=view]");

    Ext.getDom("view").innerHTML = t.applyTemplate(
{
    planetName: 'name0',
    bannedItems: [
    { itemName: 'name1', noReason: 'reason1' },
    { itemName: 'name2', noReason: 'reason2' }
    ]
}
);

    //Ext.View
    var countryStore = Ext.create('Ext.data.Store', {
        fields: ["name", "capital"],
        data: [
        { name: 'India', capital: "New Delhi" },
        { name: "USA", capital: "Washington" },
        { name: "UK", capital: "London" }
        ]
    });
    var tpl = Ext.create("Ext.XTemplate",
'<tpl for=".">',
'<p>{data.name}, <i>{data.capital}</i></p><br/>',
'</tpl>');

    Ext.create("Ext.panel.Panel", {
        title: "Countries",
        html: tpl.apply(countryStore),
        renderTo: Ext.getBody()
    });


    Ext.create("Ext.panel.Panel", {
        title: "CountriesFromDataView",
        items: new Ext.DataView({
            store: countryStore,
            tpl: [
            '<tpl for=".">',
            '<p>{name}, <i>{capital}</i></p><br/>',
            '</tpl>'],
            multiSelect: true,
            height: 310,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display'
        }),
        renderTo: Ext.getBody()
    });

});