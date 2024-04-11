const { describe } = require('node:test');
const Chartdata = require('../ChartData');

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