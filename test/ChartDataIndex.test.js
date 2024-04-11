const { describe } = require('node:test');
const Chartdata = require('../ChartData');

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