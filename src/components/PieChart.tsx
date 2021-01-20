import { Pie } from 'react-chartjs-2';

const PieChart = () => {

    let planNumber: number = 100;
    let suddenNumber: number = 10;

    const data = {
        "labels": ["計画", "突発"],
        "datasets": [{
            "label": "計画突発比率",
            // 値をそのまま入れていい
            "data": [planNumber, suddenNumber],
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