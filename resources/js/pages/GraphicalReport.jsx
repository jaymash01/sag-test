import React, { useEffect, useRef, useState } from "react";

import { Alert, LinearProgress, MenuItem, Select, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Page from "../components/Page";
import { useFetch } from "../hooks";

import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { color } from "chart.js/helpers";

Chart.register(
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
);

Chart.defaults.font.family = "'Poppins', sans-serif";
Chart.defaults.font.size = 11;

const GraphicalReport = () => {

  const theme = useTheme();

  const chartRef = useRef();
  const [chart, setChart] = useState(null);

  const { data: countries } = useFetch("api/countries", null, true, [], (response) => response.data.data);

  const [params, setParams] = useState({
    page: 1,
    per_page: 50,
    country_code: "",
  });

  const { data, loading, error, handleFetch } = useFetch("api/index", params, false, null, (response) => response.data.data.data);

  useEffect(() => {
    if (data && chartRef.current) {
      if (chart) {
        chart.destroy();
      }

      const chart1 = new Chart(chartRef.current.getContext("2d"), {
        type: "bar",
        data: {
          labels: data.map(e => e.year),
          datasets: [
            {
              label: "Life Expectancy at Birth",
              data: data.map(e => e.life_expectancy),
              backgroundColor: color(theme.palette.secondary.main).alpha(0.6).rgbString(),
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
              tension: 0.2,
            },
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            }
          }
        },
      });

      setChart(chart1);
    }
  }, [data]);

  useEffect(() => {
    if (params.country_code) {
      handleFetch();
    }
  }, [params]);

  return (
    <Page
      title="Life Expectancy at Birth"
      toolbar={(
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Select
            variant="outlined"
            size="small"
            sx={{ width: 180 }}
            displayEmpty
            value={params.country_code}
            onChange={(event) => setParams({ ...params, country_code: event.target.value })}
          >
            <MenuItem
              disabled
              value=""
            >
              Country
            </MenuItem>
            {countries.map(e => (
              <MenuItem
                key={e.country_code}
                value={e.country_code}
              >
                {e.country_name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}
    >
      {loading ? <LinearProgress sx={{ mb: 2 }}/> : null}
      {error ?
        <Alert
          sx={{ mb: 2 }}
          severity="error"
        >
          An error occurred.
        </Alert>
        : null
      }
      <canvas ref={chartRef}/>
    </Page>
  );
};

export default GraphicalReport;
