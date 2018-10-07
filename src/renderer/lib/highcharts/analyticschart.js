export const getanalyticschartconfig = (seriesobj, servantlist) => {
  let config = {};
  config.chart = {};
  config.chart = { type: 'column' };
  config.title = { text: 'Material View' };
  config.subtitle = { text: 'Resize the frame or click buttons to change appearance' };
  config.legend = {
    align: 'right',
    verticalAlign: 'middle',
    layout: 'vertical',
  };

  config.xAxis = {};
  config.xAxis.categories = servantlist;
  config.xAxis.labels = { x: -10 };
  config.xAxis.labels = {
    useHTML: true,
    formatter: function() {
      return `<img src="./icon/i/icon/item_${this.value}.jpg" style="width: 25px; vertical-align: middle" />`;
    },
  };
  config.yAxis = {
    allowDecimals: false,
    title: {
      text: 'Amount',
    },
  };
  config.series = seriesobj;
  config.responsive = {
    rules: [{
      condition: {
        maxWidth: 500,
      },
      chartOptions: {
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
        },
        yAxis: {
          labels: {
            align: 'left',
            x: 0,
            y: -5,
          },
          title: {
            text: null,
          },
        },
        subtitle: {
          text: null,
        },
        credits: {
          enabled: false,
        },
      },
    }],
  };
  return config;
};

