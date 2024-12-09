
document.addEventListener('DOMContentLoaded', () => {
    const artistasList = document.getElementById('artistasList');
    const artistaSelecionado = document.getElementById('artistaSelecionado');
    const voltarButton = document.getElementById('voltarButton');
    const detalhesArtista = document.getElementById('detalhesArtista');
    const mostrarArtistasButton = document.getElementById('mostrarArtistasButton');
    const selecionarArtista = document.getElementById('selecionarArtista');

    // Mostrar lista de artistas
    mostrarArtistasButton.addEventListener('click', () => {
        artistasList.style.display = 'block';
    });

    // Carregar lista de artistas da API
    fetch('http://localhost:3000/artistas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados da API');
            }
            return response.json();
        })
        .then(data => {
            artistasList.innerHTML = ''; // Limpar qualquer conteúdo anterior
            data.forEach(artista => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = artista.nome;
                a.href = "#";
                a.addEventListener('click', (event) => {
                    event.preventDefault(); // Previne comportamento padrão do link
                    showArtistInfo(artista);
                });
                li.appendChild(a);
                artistasList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Não foi possível carregar os artistas. Verifique a API.');
        });

    // Mostrar informações do artista
    function showArtistInfo(artista) {
        selecionarArtista.style.display = 'none';
        artistaSelecionado.style.display = 'block';

        detalhesArtista.innerHTML = ''; // Limpar informações anteriores

        const img = document.createElement('img');
        img.src = artista.foto;
        img.alt = `Foto de ${artista.nome}`;
        detalhesArtista.appendChild(img);

        const nome = document.createElement('h2');
        nome.textContent = artista.nome;
        detalhesArtista.appendChild(nome);

        const biografia = document.createElement('p');
        biografia.textContent = artista.biografia;
        detalhesArtista.appendChild(biografia);

        const albunsTitle = document.createElement('h3');
        albunsTitle.textContent = 'Álbuns';
        detalhesArtista.appendChild(albunsTitle);

        const albunsList = document.createElement('ul');
        artista.discografia.albuns.forEach(album => {
            const li = document.createElement('li');
            li.textContent = album;
            albunsList.appendChild(li);
        });
        detalhesArtista.appendChild(albunsList);
    }

    // Botão Voltar para a lista de artistas
    voltarButton.addEventListener('click', () => {
        artistaSelecionado.style.display = 'none';
        selecionarArtista.style.display = 'block';
    });
});
