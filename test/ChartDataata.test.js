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