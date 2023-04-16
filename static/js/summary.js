const chart = echarts.init(document.getElementById('summary_chart'));

let colors = ['#ff5', '#e24', '#0fa', '#59f']

let seriesData = []

const option = {
    textStyle: {
        color: '#ccc'
    },
    xAxis: {min: 0, max: 9, type: 'value', axisLine: {onZero: true}, splitNumber: 10},
    yAxis: {min: -5, max: 5, type: 'value', axisLine: {onZero: true}, splitNumber: 10},
    legend: {
        orient: 'vertical',
        right: -5,
        top: 80,
        textStyle: {
            color: '#ccc'
        }
    },
};

chart.setOption(option);

const select = document.getElementById('summarySelect');

select.addEventListener('change', function () {
    console.log('选项已经变化：' + select.value)


    if (select.value) {
        update_user_summary(select.value)
    }
});

function update_user_summary(user_name) {

    chart.clear()
    chart.setOption(option, true)

    let info;
    let attr_name;


    info = USER_INFO[user_name]

    if (!("attr" in info)) {
        return
    }

    let attr_names = Object.keys(info['attr']);

    seriesData.length = 0;

    // 添加选项
    for (let i = 0; i < attr_names.length; i++) {
        attr_name = attr_names[i]

        seriesData.push(
            {
                name: attr_name,
                type: 'line',
                smooth: true,
                data: info['attr'][attr_name]['data'],
                lineStyle: {
                    color: colors[(i + 4) % 4],
                }
            }
        )
    }

    chart.setOption({
        series: seriesData
    });
}