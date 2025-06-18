document.addEventListener('DOMContentLoaded', function() {
    const menuToggleButton = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (menuToggleButton && dropdownMenu) {
        menuToggleButton.addEventListener('click', function() {
            dropdownMenu.classList.toggle('show'); // Alterna a classe 'show'
        });

        // Fechar o menu se clicar fora dele
        document.addEventListener('click', function(event) {
            if (!dropdownMenu.contains(event.target) && !menuToggleButton.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });

        // NOVO: Fechar o menu quando um item é clicado (se o link leva a uma nova página)
        // Adicione este bloco para fechar o menu ao clicar em um link
        const menuLinks = dropdownMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Remove a classe 'show' para fechar o menu
                dropdownMenu.classList.remove('show');
                // Se o link é para uma âncora na mesma página, o menu fecha.
                // Se o link é para uma nova página, ele fecha antes da navegação.
            });
        });
    }
});