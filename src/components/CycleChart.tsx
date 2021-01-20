import { Pie } from 'react-chartjs-2';

const CycleChart = () => {

    const data = {
        "labels": ["計画", "突発"],
        "datasets": [{
            "label": "計画突発比率",
            "data": [60, 40],
            "backgroundColor": ["rgb(255, 99, 132)",
                "rgb(54, 162, 235)"]
        }]
    }

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    return (
        <Pie
            data={data}
            width={50}
            height={30}
            options={{ maintainAspectRatio: false }}
        />
    );
};

export default CycleChart;