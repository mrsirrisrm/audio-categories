import { Categories } from "./types";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
  } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { HeatMapGrid } from "react-grid-heatmap";

type CategorisedViewProps = {
    categories: Categories | null;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
  );

const CategorisedView = (props: CategorisedViewProps) => {

    const { categories } = props;
    if (!categories) {
        return null;
    }

    const yMax = categories.categories.reduce((acc, category) => {
        return Math.max(acc, category.timed.reduce((acc, y) => Math.max(acc, y), 0));
    }, 0);

    const scatterPlotOptions = {
        responsive: true,
        animation: false as any,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 0,
            }
        },
        scales: {
            x: {},
            y: {
                min: 0,
                max: yMax,
            }
        },
        plugins: {
            legend: {display: false },
            title: {display: false },
        },
    };

    const gridData = categories.categories.map(category => category.timed);
    const xLabels = categories.times.map(time => Math.floor(time) === time ? `${time}` : time.toFixed(1));
    const yLabels = categories.categories.map(category => category.name);

    return (
        <div style={{marginTop: 40}}>
            <HeatMapGrid
                data={gridData}
                xLabels={xLabels}
                yLabels={yLabels}
                xLabelsStyle={index => ({
                    color: index % 2 ? "transparent" : "black",
                    fontSize: ".65rem",
                    fontFamily: "Verdana, sans-serif"
                })}
                yLabelsStyle={() => ({
                    fontSize: ".65rem",
                    textTransform: "uppercase",                    
                    fontFamily: "Verdana, sans-serif"
                })}
                cellStyle={(_x, _y, ratio) => ({
                    borderRadius: 0,
                    background: `rgb(12, 160, 44, ${ratio})`,
                    fontSize: ".7rem",
                    color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
                })}
                cellHeight="1.5rem"
                xLabelsPos="top"
            />                
        </div>        
    );
}

export default CategorisedView;