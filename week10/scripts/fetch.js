const button = document.querySelector("button");
url =
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02&latitude=43.814540699999995&longitude=-111.78491029999999&maxradiuskm=100";

const getEarthquake = async () => {
  const response = await fetch(url);

  // Get the promises
  const data = await response.json();
  let mydata = [];

  // This part will get the properties of the earthquake data
  for (const i of data.features.values()) {
    mydata.push(i.properties);
  }

  return mydata;
};

//Let's display the data received
const outputdata = async () => {
  let mydata = await getEarthquake();

  for (const i of mydata) {
    var date = new Date(i.time);
    formatDate =
      date.toLocaleString("default", { month: "short" }) +
      " " +
      (date.getUTCDate() < 10 ? "0" : "") +
      date.getUTCDate() +
      ", " +
      date.getUTCFullYear();

    document.getElementById(
      "quake"
    ).innerHTML += `<li id="dataLine">On ${formatDate} an ${i.type} hit ${i.place} with a magnitude of ${i.mag}.</li>`;
  }
};

button.addEventListener("click", outputdata);
