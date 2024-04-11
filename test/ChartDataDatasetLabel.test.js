const { describe } = require('node:test');
const Chartdata = require('../ChartData');

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