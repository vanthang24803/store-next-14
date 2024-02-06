const getChart = async () => {
  const URL = `${process.env.API_URL}/api/order/chart`;

  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getChart;
