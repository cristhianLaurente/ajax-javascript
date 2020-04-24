let btnGetData = document.getElementById('btnGetData');
let table = document.getElementById('table');
let loading = document.getElementById('loading');
let tbody = document.getElementById('tbody');


let createTable = (usuarios) => {
    tbody.innerHTML = '';

    usuarios.map(usuario => {
        let fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.name}</td>
            <td>${usuario.username}</td>
            <td>${usuario.email}</td>
            <td>${usuario.phone}</td>
            <td>${usuario.website}</td>
        `

        tbody.appendChild(fila);
    });
}


const getUsuarios = () => {
    return new Promise((resolve, reject) => {

        let http = new XMLHttpRequest();

        http.onreadystatechange = () => {

            if (http.readyState === 4 && http.status === 200) {
                resolve(http.responseText);
            }

            if (http.readyState === 4 && http.status === 404) {
                reject('No hay usuarios en la base de datos');
            }

        }

        http.open('GET', 'https://jsonplaceholder.typicode.com/users');

        http.send();

    })
}


btnGetData.onclick = () => {
    loading.removeAttribute('hidden');
    table.setAttribute('hidden', 'hidden');

    getUsuarios().then((res) => {
        let objJson = JSON.parse(res);
        table.removeAttribute('hidden');
        loading.setAttribute('hidden', 'hidden');
        createTable(objJson)
    })
}