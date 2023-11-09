const axios = require("axios");

axios.get("https://jsonplaceholder.typicode.com/posts/1", function (response1) {
  // Função de retorno de chamada 1
  axios.get(
    "https://jsonplaceholder.typicode.com/users/1",
    function (response2) {
      // Função de retorno de chamada 2
      axios.get(
        "https://jsonplaceholder.typicode.com/comments?postId=1",
        function (response3) {
          // Função de retorno de chamada 3
          console.log("Post:", response1.data);
          console.log("User:", response2.data);
          console.log("Comments:", response3.data);
        }
      );
    }
  );
});


const fetchJson = (url) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status}`);
        }
        return response.json();
      });
  };
  
  fetchJson('https://jsonplaceholder.typicode.com/posts/1')
    .then((data1) => {
      console.log('Post:', data1);
      return fetchJson('https://jsonplaceholder.typicode.com/users/1');
    })
    .then((data2) => {
      console.log('User:', data2);
      return fetchJson('https://jsonplaceholder.typicode.com/comments?postId=1');
    })
    .then((data3) => {
      console.log('Comments:', data3);
    })
    .catch((error) => {
      console.error(error);
    });