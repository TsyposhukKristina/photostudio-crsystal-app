import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { ru } from "date-fns/locale";
import { Component } from "../abstract/Component";

export class Graph extends Component {
  graphik: Chart<"bar", { x: Date; y: number }[], Date>;

  constructor(parrent: HTMLElement) {
    super(parrent, "div", ["chart"]);

    const canvas = new Component(this.node, "canvas", ["graph"]);

    this.graphik = new Chart(canvas.node as HTMLCanvasElement, {
      type: "bar",
      data: {
        labels: [new Date()],
        datasets: [
          {
            label: "График",
            data: [
              {
                x: new Date(),
                y: 0
              }
            ],
            backgroundColor: "rgba(255, 0, 0, 1)",
            borderColor: "rgba(0, 206, 86, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Мой график"
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "dd.MM.yy"
              }
            },
            ticks: {
              source: "auto"
            },
            adapters: {
              date: {
                locale: ru
              }
            }
          },
          y: {
            title: {
              text: "рубли",
              display: true
            },
            beginAtZero: true
          }
        }
      }
    });
  }
}
