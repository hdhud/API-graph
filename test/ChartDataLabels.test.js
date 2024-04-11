const { describe } = require('node:test');
const Chartdata = require('../ChartData');

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