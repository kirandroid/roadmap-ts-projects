async function fetchData() {
    const response = await fetch("https://api.github.com/users/jaygaha/events");
    const data = await response.json();
    console.log(data);

}

fetchData();