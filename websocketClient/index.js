am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.paddingRight = 20;

var data = [];

var ws = new WebSocket("ws://127.0.0.1:5678/");



ws.onmessage = function (event) {

  newData = JSON.parse(event.data);
  data.push({ date: new Date(newData['date']) , value: newData['data'] });
  console.log(data)
  chart.data = data;
};

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.renderer.minWidth = 35;

var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.dateX = "date";
series.dataFields.valueY = "value";
series.tooltipText = "{valueY}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.background.fillOpacity = 0.5;

chart.cursor = new am4charts.XYCursor();
chart.cursor.snapToSeries = series;
chart.cursor.xAxis = dateAxis;

var scrollbarX = new am4charts.XYChartScrollbar();
scrollbarX.series.push(series);
chart.scrollbarX = scrollbarX;


