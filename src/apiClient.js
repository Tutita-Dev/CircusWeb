
 const api2 = (() => {
    const baseUrl = "http://localhost:3000";

    const fetchObstaclesc = (levelId) => { 
        const url =`${baseUrl}/obstaclesc/${levelId}`; 
        return fetch(url)
            .then((response) => response.json())    
            .catch(error => {                   
            });
    }; 
     return { fetchObstaclesc }; 
 })();

 
 const apiNivel = (() => {
    const baseUrl = "http://localhost:3000";

    const fetchNivel = (levelId) => { 
        const url =`${baseUrl}/level/${levelId}`; 
        return fetch(url)
            .then((response) => response.json())    
            .catch(error => {                   
            });
    }; 
     return { fetchNivel }; 
 })();

 const apiPlayer = (() => {
    const baseUrl = "http://localhost:3000";

    const fetchPlayer = (usuario,pass) => { 
        const url =`${baseUrl}/player/${usuario}/${pass}`; 
        return fetch(url)
            .then((response) => response.json())    
            .catch(error => {                   
            });
    }; 
     return { fetchPlayer }; 
 })();

