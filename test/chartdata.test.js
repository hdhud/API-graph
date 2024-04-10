const { describe } = require('node:test');
const Chartdata = require('../ChartData');

describe('Chartdata', () => {
    // Test du constructeur
    test('should create an instance of Chartdata', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600
        };
        const data = {
            cols: [{
                "id": "col1",
                "label": "col1",
                "type": "string"
              },
              {
                "id": "col2",
                "label": "col2",
                "type": "string"
              },
              {
                "id": "col3",
                "label": "col3",
                "type": "string"
              }],
            rows: [{ c: ['value1', 'value2','value3'] }],
        };
        const chartdata = new Chartdata(datachart, data);
        expect(chartdata).toBeInstanceOf(Chartdata);
    });
    
});
describe('getIndexByColumnName', () => {
    // Test lorsque la colonne est trouvée
    test('should return the correct index when column name is found', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600
        };
        const data = {
            cols: [{
                "id": "col1",
                "label": "col1",
                "type": "string"
              },
              {
                "id": "col2",
                "label": "col2",
                "type": "string"
              },
              {
                "id": "col3",
                "label": "col3",
                "type": "string"
              }],
            rows: [{ c: ['value1', 'value2','value3'] }],
        };
        const chartdata = new Chartdata(datachart, data);
        const columnName = chartdata.colX;

        const index = chartdata.getIndexByColumnName(columnName);

        expect(index).toBe(0);
    });

    // Test lorsque la colonne n'est pas trouvée
    test('should return -1 when column name is not found', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col4',
            tailleX :1600,
            tailleY :600
        };
        const data = {
            cols: [{
                "id": "col1",
                "label": "col1",
                "type": "string"
              },
              {
                "id": "col2",
                "label": "col2",
                "type": "string"
              },
              {
                "id": "col3",
                "label": "col3",
                "type": "string"
              }],
            rows: [{ c: ['value1', 'value2','value3'] }],
        };
        const chartdata = new Chartdata(datachart, data);
        const columnName = Chartdata.colX;

        const index = chartdata.getIndexByColumnName(columnName);

        expect(index).toBe(-1);
    });
});

describe('getTypeByColumnIndex', () => {
    // Test lorsque l'index de la colonne est valide
    test('should return the correct type when column index is valid', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600
        };
        const data = {
            cols: [{
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
              }],
            rows: [{ c: ['value1', 'value2','value3'] }],
        };
        const chartdata = new Chartdata(datachart, data);
        const columnIndex = 0; 

        const type = chartdata.getTypeByColumnIndex(columnIndex);

        expect(type).toBe('string'); 
    });

    // Test lorsque l'index de la colonne est invalide
    test('should return undefined when column index is invalid', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX :'col1',
            tailleX :1600,
            tailleY :600
        };
        const data = {
            cols: [{
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
              }],
            rows: [{ c: ['value1', 'value2','value3'] }],
        };
        const chartdata = new Chartdata(datachart, data);
        const columnIndex = 5;

        const type = chartdata.getTypeByColumnIndex(columnIndex);

        expect(type).toBeUndefined();
    });
});
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

const globaldataregrouper = {
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
            "type": "string"
        },
        {
            "id": "col4",
            "label": "col4",
            "type": "date"
        }
    ],
    rows: [
        { c: ['value1', 10, 'category1', '2024-04-10'] },
        { c: ['value2', 20, 'category1', '2024-04-10'] },
        { c: ['value3', 30, 'category2', '2024-04-11'] },
        { c: ['value4', 30, 'category2', '2024-04-11'] },
        { c: ['value5', 50, 'category3', '2024-04-12'] },
        { c: ['value6', 60, 'category3', '2024-04-10'] },
        { c: ['value7', 70, 'category4', '2024-04-16'] },
        { c: ['value8', 70, 'category4', '2024-04-11'] },
        { c: ['value9', 90, 'category5', '2024-04-11'] }
    ]
};


describe('regrouperParParametre', () => {
    test('should group data correctly by parameter when col is date', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX: 'col4',
            tailleX: 1600,
            tailleY: 600,
            selection: {}
        };
        const chartdata = new Chartdata(datachart, globaldataregrouper);
        const dataregrouper = chartdata.regrouperParParametre();

        // Expected grouped data
        const expectedGroupedData = [
            {
                parametre: '2024-04-10',
                donnees: [
                    { c: ['value1', 10, 'category1', '2024-04-10'] },
                    { c: ['value2', 20, 'category1', '2024-04-10'] },
                    { c: ['value6', 60, 'category3', '2024-04-10'] }
                ]
            },
            {
                parametre: '2024-04-11',
                donnees: [
                    { c: ['value3', 30, 'category2', '2024-04-11'] },
                    { c: ['value4', 30, 'category2', '2024-04-11'] },
                    { c: ['value8', 70, 'category4', '2024-04-11'] },
                    { c: ['value9', 90, 'category5', '2024-04-11'] }
                ]
            },
            {
                parametre: '2024-04-12',
                donnees: [
                    { c: ['value5', 50, 'category3', '2024-04-12'] }
                ]
            },
            {
                parametre: '2024-04-16',
                donnees: [
                    { c: ['value7', 70, 'category4', '2024-04-16'] }
                ]
            }
        ];

        // Check if the grouped data matches the expected result
        expect(dataregrouper).toEqual(expectedGroupedData);
    });

    test('should group data correctly by parameter when col is number', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX: 'col2',
            tailleX: 1600,
            tailleY: 600,
            selection: {}
        };
        const chartdata = new Chartdata(datachart, globaldataregrouper);
        const dataregrouper = chartdata.regrouperParParametre();

        // Expected grouped data
        const expectedGroupedData = [
            {
                parametre: 10,
                donnees: [
                    { c: ['value1', 10, 'category1', '2024-04-10'] }
                ]
            },
            {
                parametre: 20,
                donnees: [
                    { c: ['value2', 20, 'category1', '2024-04-10'] }
                ]
            },
            {
                parametre: 30,
                donnees: [
                    { c: ['value3', 30, 'category2', '2024-04-11'] },
                    { c: ['value4', 30, 'category2', '2024-04-11'] }
                ]
            },
            {
                parametre: 50,
                donnees: [
                    { c: ['value5', 50, 'category3', '2024-04-12'] }
                ]
            },
            {
                parametre: 60,
                donnees: [
                    { c: ['value6', 60, 'category3', '2024-04-10'] }
                ]
            },
            {
                parametre: 70,
                donnees: [
                    { c: ['value7', 70, 'category4', '2024-04-16'] },
                    { c: ['value8', 70, 'category4', '2024-04-11'] }
                ]
            },
            {
                parametre: 90,
                donnees: [
                    { c: ['value9', 90, 'category5', '2024-04-11'] }
                ]
            }
        ];

        expect(dataregrouper).toEqual(expectedGroupedData);
    });

    test('should group data correctly by parameter when col is string', () => {
        const datachart = {
            type: 'line',
            titre: 'Test Chart',
            colX: 'col3',
            tailleX: 1600,
            tailleY: 600,
            selection: {}
        };
        const chartdata = new Chartdata(datachart, globaldataregrouper);
        const dataregrouper = chartdata.regrouperParParametre();

        // Expected grouped data
        const expectedGroupedData = [
            {
                parametre: 'category1',
                donnees: [
                    { c: ['value1', 10, 'category1', '2024-04-10'] },
                    { c: ['value2', 20, 'category1', '2024-04-10'] }
                ]
            },
            {
                parametre: 'category2',
                donnees: [
                    { c: ['value3', 30, 'category2', '2024-04-11'] },
                    { c: ['value4', 30, 'category2', '2024-04-11'] }
                ]
            },
            {
                parametre: 'category3',
                donnees: [
                    { c: ['value5', 50, 'category3', '2024-04-12'] },
                    { c: ['value6', 60, 'category3', '2024-04-10'] }
                ]
            },
            {
                parametre: 'category4',
                donnees: [
                    { c: ['value7', 70, 'category4', '2024-04-16'] },
                    { c: ['value8', 70, 'category4', '2024-04-11'] }
                ]
            },
            {
                parametre: 'category5',
                donnees: [
                    { c: ['value9', 90, 'category5', '2024-04-11'] }
                ]
            }
        ];

        expect(dataregrouper).toEqual(expectedGroupedData);
    });
});

describe('sommedata', () => {
    const globaldataregrouper = {
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
                "type": "string"
            },
            {
                "id": "col4",
                "label": "col4",
                "type": "date"
            }
        ],
        rows: [
            { c: ['value1', 10, 'category1', '2024-04-10'] },
            { c: ['value2', 20, 'category1', '2024-04-10'] },
            { c: ['value3', 30, 'category2', '2024-04-11'] },
            { c: ['value4', 30, 'category2', '2024-04-11'] },
            { c: ['value5', 50, 'category3', '2024-04-12'] },
            { c: ['value6', 60, 'category3', '2024-04-12'] },
            { c: ['value7', 70, 'category4', '2024-04-13'] },
            { c: ['value8', 70, 'category4', '2024-04-13'] },
            { c: ['value9', 90, 'category5', '2024-04-14'] }
        ]
    };

    test('should return the sum of numeric values in the specified column', () => {
        const chartdata = new Chartdata({}, globaldataregrouper);
        const colIndex = chartdata.getIndexByColumnName('col2');
        const rowData = globaldataregrouper.rows;
        const expectedSum = 10 + 20 + 30 + 30 + 50 + 60 + 70 + 70 + 90;
        const actualSum = chartdata.sommedata(colIndex, rowData);
        expect(actualSum).toEqual(expectedSum);
    });

    test('should return 0 if no numeric values are found in the specified column', () => {
        const chartdata = new Chartdata({}, globaldataregrouper);
        const colIndex = chartdata.getIndexByColumnName('col1'); 
        const rowData = globaldataregrouper.rows;
        const expectedSum = 0;
        const actualSum = chartdata.sommedata(colIndex, rowData);
        expect(actualSum).toEqual(expectedSum);
    });

    test('should return the correct sum when some values in the specified column are null', () => {
        const chartdata = new Chartdata({}, globaldataregrouper);
        const colIndex = chartdata.getIndexByColumnName('col2');
        const rowData = [
            { c: ['value1', 10, 'category1', '2024-04-10'] },
            { c: ['value2', null, 'category1', '2024-04-10'] }, 
            { c: ['value3', 30, 'category2', '2024-04-11'] },
            { c: ['value4', 30, 'category2', '2024-04-11'] },
            { c: ['value5', 50, 'category3', '2024-04-12'] },
            { c: ['value6', 60, 'category3', '2024-04-12'] },
            { c: ['value7', 70, 'category4', '2024-04-13'] },
            { c: ['value8', 70, 'category4', '2024-04-13'] },
            { c: ['value9', 90, 'category5', '2024-04-14'] }
        ];
        const expectedSum = 10 + 30 + 30 + 50 + 60 + 70 + 70 + 90; 
        const actualSum = chartdata.sommedata(colIndex, rowData);
        expect(actualSum).toEqual(expectedSum);
    });

    test('should return the correct sum when some values in the specified column are strings', () => {
        const chartdata = new Chartdata({}, globaldataregrouper);
        const colIndex = chartdata.getIndexByColumnName('col2'); 
        const rowData = [
            { c: ['value1', 10, 'category1', '2024-04-10'] },
            { c: ['value2', '20', 'category1', '2024-04-10'] },
            { c: ['value3', 30, 'category2', '2024-04-11'] },
            { c: ['value4', 30, 'category2', '2024-04-11'] },
            { c: ['value5', 50, 'category3', '2024-04-12'] },
            { c: ['value6', 60, 'category3', '2024-04-12'] },
            { c: ['value7', 70, 'category4', '2024-04-13'] },
            { c: ['value8', 70, 'category4', '2024-04-13'] },
            { c: ['value9', 90, 'category5', '2024-04-14'] }
        ];
        const expectedSum = 10 + 20 + 30 + 30 + 50 + 60 + 70 + 70 + 90; 
        const actualSum = chartdata.sommedata(colIndex, rowData);
        expect(actualSum).toEqual(expectedSum);
    });
});

describe('getlabels', () => {
    test('should return sorted labels without date', () => {
        const datachart = {
            type: 'line',
            colX: 'param',
            colY: 'value',
        };
        const data = {
            cols: [
                { id: 'param', type: 'string' },
                { id: 'value', type: 'number' }
            ],
            rows: [
                { c: [  'B',  2 ] },
                { c: [  'A',  1 ] },
                { c: [  'C',  3 ] }
            ]
        };
        const chartdata = new Chartdata(datachart, data);
        const labels = chartdata.getlabels(chartdata.regrouperParParametre());
        expect(labels).toEqual(['A', 'B', 'C']);
    });

    test('should return sorted labels with date', () => {
        const datachart = {
            type: 'line',
            colX: 'date',
            colY: 'value',
        };
        const data = {
            cols: [
                { id: 'date', type: 'date' },
                { id: 'value', type: 'number' }
            ],
            rows: [
                { c: [  '2024-04-02',  2 ] },
                { c: [  '2024-04-01',  1 ] },
                { c: [  '2024-04-03',  3 ] }
            ]
        };
        const chartdata = new Chartdata(datachart, data);
        const labels = chartdata.getlabels(chartdata.regrouperParParametre());
        expect(labels).toEqual(['2024-04-01', '2024-04-02', '2024-04-03']);
    });
});

describe('getoptions', () => {
    test('allfont (legend,title,axis,labelaxis)', () => {
        const datachart = {
            type: 'bar',
            titre: 'Titre du graphique',
            titreX: 'Titre de l\'axe X',
            titreY: 'Titre de l\'axe Y',
            legendposition: 'bottom',
            startFromZero:true,
            tailleX: 1200,
            tailleY: 800,
            fontlegend: {
                size: "16",
                family: "Arial",
                weight: "bold"
            },
            fontlegendcolor: "black",
            fonttitre: {
                size: "20",
                family: "Arial",
                weight: "bold"
            },
            fonttitrecolor: "black",
            fontaxis: {
                size: "14",
                family: "Arial",
                weight: "bold",
                style: "italic"
            },
            fontaxiscolor: "black",
            fontlabelaxis: {
                size: "12",
                family: "Arial",
                weight: "normal"
            },
            fontlabelaxiscolor: "black"
        };
        const chartdata = new Chartdata(datachart, {});
        const options = chartdata.options;

        expect(options.plugins.legend).toEqual({
            display:true,
            position:'bottom',
            labels: {
                font: {
                    size: "16",
                    family: "Arial",
                    weight: "bold"
                },
                color: "black"
            }
        });

        expect(options.plugins.title).toEqual({
            display: true,
            text: 'Titre du graphique',
            font:{
                size: "20",
                family: "Arial",
                weight: "bold"
            },
            color:"black"
        });

        expect(options.scales.y).toEqual({
            beginAtZero:true,
            title: {
                display:true,
                text:"Titre de l\'axe Y",
                font:{
                    size: "14",
                    family: "Arial",
                    weight: "bold",
                    style: "italic"
                },
                color:"black",
            },
            ticks: {
                font:{
                    size: "12",
                    family: "Arial",
                    weight: "normal"
                },
                color:"black",
            }
        });

        expect(options.scales.x).toEqual({
            title: {
                display:true,
                text:"Titre de l\'axe X",
                font:{
                    size: "14",
                    family: "Arial",
                    weight: "bold",
                    style: "italic"
                },
                color:"black",
            },
            ticks: {
                font:{
                    size: "12",
                    family: "Arial",
                    weight: "normal"
                },
                color:"black",
            }
        });
    });
    test('allfont off (legend,title,axis,labelaxis)', () => {
        const datachart = {
            type: 'bar',
            titre: '',
            titreX: '',
            titreY: '',
            legendposition: '',
            tailleX: 1200,
            tailleY: 800,
        };
        const chartdata = new Chartdata(datachart, {});
        const options = chartdata.options;

        expect(options.plugins.legend).toEqual({
            display:false,
            position:'',
            labels: {
                font: {
                },
                color: "black"
            }
        });

        expect(options.plugins.title).toEqual({
            display: false,
            text: '',
            font:{
            },
            color:"black"
        });

        expect(options.scales.y).toEqual({
            beginAtZero:false,
            title: {
                display:false,
                text:"",
                font:{
                },
                color:"black",
            },
            ticks: {
                font:{
                },
                color:"black",
            }
        });

        expect(options.scales.x).toEqual({
            title: {
                display:false,
                text:"",
                font:{
                },
                color:"black",
            },
            ticks: {
                font:{
                },
                color:"black",
            }
        });
    });
    test('allfont off (legend,title,axis,labelaxis)', () => {
        const datachart = {
            type: 'pie',
            titre: '',
            titreX: '',
            titreY: '',
            legendposition: '',
            tailleX: 1200,
            tailleY: 800,
        };
        const chartdata = new Chartdata(datachart, {});
        const options = chartdata.options;

        expect(options.plugins.legend).toEqual({
            display:false,
            position:'',
            labels: {
                font: {
                },
                color: "black"
            }
        });

        expect(options.plugins.title).toEqual({
            display: false,
            text: '',
            font:{
            },
            color:"black"
        });

        expect(options.scales).toEqual({});
    });
});

describe('createdatasetlabels', () => {
    const globaldatacreatedatasetlabel = {
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
                "type": "string"
            },
            {
                "id": "col4",
                "label": "col4",
                "type": "date"
            }
        ],
        rows: [
            { c: ['value1', 10, 'category1', '2024-04-10'] },
            { c: ['value2', 20, 'category1', '2024-04-10'] },
            { c: ['value3', 30, 'category2', '2024-04-11'] },
            { c: ['value4', 30, 'category2', '2024-04-11'] },
            { c: ['value5', 50, 'category3', '2024-04-12'] },
            { c: ['value6', 60, 'category3', '2024-04-10'] },
            { c: ['value7', 70, 'category4', '2024-04-16'] },
            { c: ['value8', 70, 'category4', '2024-04-11'] },
            { c: ['value9', 90, 'category5', '2024-04-11'] }
        ]
    };

    test('without showQuantity', () => {
        const datachart = {
            colX: 'col3',
            colY: 'col2',
            agregation: 'somme',
            tailleX:1600,
            tailleY:600,
            type: 'bar'
        };
        const chartdata = new Chartdata(datachart, globaldatacreatedatasetlabel);
        const [dataset, labels] = chartdata.createdatasetlabels();

        // Vérifier le dataset
        expect(dataset.label).toBe('Quantité');
        expect(dataset.data).toEqual([30, 60, 110, 140, 90]);
        expect(dataset.backgroundColor).toBe('rgb(0, 96, 255)');

        // Vérifier les labels
        expect(labels).toEqual(['category1', 'category2', 'category3', 'category4', 'category5']);
    });

    // Test pour vérifier le dataset et les labels avec showQuantity activé
    test('with showQuantity', () => {
        const datachart = {
            colX: 'col3',
            colY: 'col2',
            agregation: 'somme',
            type: 'bar',
            showQuantity: true
        };
        const chartdata = new Chartdata(datachart, globaldatacreatedatasetlabel);
        const [dataset, labels] = chartdata.createdatasetlabels();

        // Vérifier le dataset
        expect(dataset.label).toBe('Quantité');
        expect(dataset.data).toEqual([30, 60, 110, 140, 90]);
        expect(dataset.backgroundColor).toBe('rgb(0, 96, 255)');

        // Vérifier les labels
        expect(labels).toEqual(['category1 (30)', 'category2 (60)', 'category3 (110)', 'category4 (140)', 'category5 (90)']);
    });

    // Test pour vérifier le dataset et les labels avec l'agrégation "moyenne"
    test('with average aggregation', () => {
        const datachart = {
            colX: 'col3',
            colY: 'col2',
            agregation: 'moyenne',
            type: 'bar'
        };
        const chartdata = new Chartdata(datachart, globaldatacreatedatasetlabel);
        const [dataset, labels] = chartdata.createdatasetlabels();

        // Vérifier le dataset
        expect(dataset.label).toBe('Quantité');
        expect(dataset.data).toEqual([15, 30, 55, 70, 90]);
        expect(dataset.backgroundColor).toBe('rgb(0, 96, 255)');

        // Vérifier les labels
        expect(labels).toEqual(['category1', 'category2', 'category3', 'category4', 'category5']);
    });
    test('with quantity aggregation', () => {
        const datachart = {
            colX: 'col3',
            colY: 'col2',
            agregation: 'qte',
            type: 'bar'
        };
        const chartdata = new Chartdata(datachart, globaldatacreatedatasetlabel);
        const [dataset, labels] = chartdata.createdatasetlabels();

        // Vérifier le dataset
        expect(dataset.label).toBe('Quantité');
        expect(dataset.data).toEqual([2,2,2,2,1]);
        expect(dataset.backgroundColor).toBe('rgb(0, 96, 255)');

        // Vérifier les labels
        expect(labels).toEqual(['category1', 'category2', 'category3', 'category4', 'category5']);
    });
});