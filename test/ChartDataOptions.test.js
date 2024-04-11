const { describe } = require('node:test');
const Chartdata = require('../ChartData');

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