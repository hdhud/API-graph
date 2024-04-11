const { describe } = require('node:test');
const Chartdata = require('../ChartData');

const globaldata = {
    cols: [
        {
            "id": "col1",
            "label": "col1",
            "type": "string"
        },
        {
            "id": "col2",
            "label": "col2",
            "type": "number"
        },
        {
            "id": "col3",
            "label": "col3",
            "type": "date"
        }
    ],
    rows: [
        { c: ['value1', 10, '2024-04-10'] },
        { c: ['value2', 20, '2024-04-11'] },
        { c: ['value3', 30, '2024-04-12'] },
        { c: ['value4', 40, '2024-04-13'] },
        { c: ['value5', 50, '2024-04-14'] },
        { c: ['value6', 60, '2024-04-15'] },
        { c: ['value7', 70, '2024-04-16'] },
        { c: ['value8', 80, '2024-04-17'] },
        { c: ['value9', 90, '2024-04-18'] }
    ]
};
describe('dataselection', () => {
    // Test lorsque l'index de la colonne est valide
    test('should return the correct ligne when selection is valid', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col1":['value1','value6','value9']
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value1', 10, '2024-04-10'] },
        { c: ['value6', 60, '2024-04-15'] },
        { c: ['value9', 90, '2024-04-18'] }]); 
    });
    test('symbole "!" string', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col1":['!value1','!value3','!value5','!value7','!value9']
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value2', 20, '2024-04-11'] },
        { c: ['value4', 40, '2024-04-13'] },
        { c: ['value6', 60, '2024-04-15'] },
        { c: ['value8', 80, '2024-04-17'] },]); 
    });

    test('equal number', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col2":[80]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value8', 80, '2024-04-17'] }]); 
    });

    test('symbole > number', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col2":[">80"]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value9', 90, '2024-04-18'] }]); 
    });
    test('symbole < number', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col2":["<30"]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value1', 10, '2024-04-10'] },
        { c: ['value2', 20, '2024-04-11'] }]); 
    });
    test('symbole ! number', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col2":["!80","!60","!40","!20"]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value1', 10, '2024-04-10'] },
        { c: ['value3', 30, '2024-04-12'] },
        { c: ['value5', 50, '2024-04-14'] },
        { c: ['value7', 70, '2024-04-16'] },
        { c: ['value9', 90, '2024-04-18'] }]); 
    });
    test('combinaison symbole !>< number', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col2":[">20","<60","!40"]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value3', 30, '2024-04-12'] },
        { c: ['value5', 50, '2024-04-14'] }]); 
    });

    test('equal date', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col3":['2024-04-13']
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value4', 40, '2024-04-13'] }]); 
    });

    test('symbole > date', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col3":[">2024-04-13"]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value5', 50, '2024-04-14'] },
        { c: ['value6', 60, '2024-04-15'] },
        { c: ['value7', 70, '2024-04-16'] },
        { c: ['value8', 80, '2024-04-17'] },
        { c: ['value9', 90, '2024-04-18'] }]); 
    });
    test('symbole < date', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col3":["<2024-04-13"]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value1', 10, '2024-04-10'] },
        { c: ['value2', 20, '2024-04-11'] },
        { c: ['value3', 30, '2024-04-12'] }]); 
    });
    test('symbole ! date', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col3":["!2024-04-10","!2024-04-12","!2024-04-14","!2024-04-16","!2024-04-18"]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value2', 20, '2024-04-11'] },
        { c: ['value4', 40, '2024-04-13'] },
        { c: ['value6', 60, '2024-04-15'] },
        { c: ['value8', 80, '2024-04-17'] },
       ]); 
    });
    test('combinaison symbole !>< date', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col3":[">2024-04-11","<2024-04-15","!2024-04-13"]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value3', 30, '2024-04-12'] },
        { c: ['value5', 50, '2024-04-14'] }]); 
    });
    test('multi column', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600,
            selection:{
                "col1":['!value4'],
                "col2":["<60"],
                "col3":[">2024-04-11"]
            }
        };
        const chartdata = new Chartdata(datachart, globaldata);
        const dataselection = chartdata.dataselection();

        expect(dataselection).toEqual([{ c: ['value3', 30, '2024-04-12'] },
        { c: ['value5', 50, '2024-04-14'] }]); 
    });

});