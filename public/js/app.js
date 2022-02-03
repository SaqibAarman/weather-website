console.log("Connect To The Main Page....");

const weatherForm = document.querySelector("form");
const searchTerm = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "Loading...";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchTerm.value;
  fetch("http://localhost:3001/weather?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        //console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        /* console.log(data.forecast);
        console.log(data.location); */
      }
    });
  });
});
