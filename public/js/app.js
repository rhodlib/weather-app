(() => {
  console.log("Client side javascript file is loaded!");

  const weatherForm = document.querySelector("form");
  const search = document.querySelector("input");
  const messageOne = document.getElementById("message-1");
  const messageTwo = document.getElementById("message-2");

  weatherForm.addEventListener("submit", event => {
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch(`/weather?address=${location}`).then(
      response => {
        response.json().then(data => {
          if (data.error) {
            messageOne.textContent = data.error;
          } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = `
                        ${data.forecast.summary}, It is 
                        ${data.forecast.temperature} degress out. This high today is 
                        ${data.forecast.maxTemperature} with a low of 
                        ${data.forecast.minTemperature}. There is a 
                        ${data.forecast.chanceToRain}% chance to rain.
                    `;
          }
        });
      }
    );
  });
})();
