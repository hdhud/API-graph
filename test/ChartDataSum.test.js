const { describe } = require('node:test');
const Chartdata = require('../ChartData');

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
