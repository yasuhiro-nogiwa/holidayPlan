import React from 'react';
import { Pie } from 'react-chartjs-2';

type Props = {
    plan: number;
    sudden: number;
}

const PieChart: React.FC<Props> = props => {

    const data = {
        "labels": ["計画", "突発"],
        "datasets": [{
            "label": "計画突発比率",
            "data": [props.plan, props.sudden],
            "backgroundColor": ["rgb(255, 99, 132)",
                "rgb(54, 162, 235)"]
        }]
    }

    return (
        <Pie
            data={data}
            width={50}
            height={30}
            options={{ maintainAspectRatio: false }}    //アスペクト比の維持
        />
    );
};

export default PieChart;