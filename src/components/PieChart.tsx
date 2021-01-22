import { Pie } from 'react-chartjs-2';

// import GetApi from './GetApi';

const PieChart = () => {

    //計画総数
    let planNumber = function() {
        // return GetApi("totalplan", "dummy");
        return 100;
    };
    //突発総数
    let suddenNumber = function() {
        // return GetApi("totalsudden", "dummy");
        return 10;
    };

    const data = {
        "labels": ["計画", "突発"],
        "datasets": [{
            "label": "計画突発比率",
            // 値をそのまま入れていい
            "data": [planNumber(), suddenNumber()],
            "backgroundColor": ["rgb(255, 99, 132)",
                "rgb(54, 162, 235)"]
        }]
    }

    //小さく表示したい場合のオプション
    // const options = {
    //     scales: {
    //         yAxes: [{
    //             ticks: {
    //                 beginAtZero: true
    //             }
    //         }]
    //     }
    // }

    return (
        <Pie
            data={data}
            width={50}
            height={30}
            options={{ maintainAspectRatio: false }}
        />
    );
};

export default PieChart;