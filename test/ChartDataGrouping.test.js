const { describe } = require('node:test');
const Chartdata = require('../ChartData');

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