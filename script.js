document.addEventListener('DOMContentLoaded', function() {
    const menuToggleButton = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const acessibilidadeBtn = document.getElementById('acessibilidadeBtn');
    
    let leituraAtiva = localStorage.getItem('leituraAtiva') === 'true';
    acessibilidadeBtn.textContent = leituraAtiva ? 'Desativar Leitor de Tela' : 'Ativar Leitor de Tela';

    if (menuToggleButton && dropdownMenu) {
        menuToggleButton.setAttribute('aria-expanded', 'false');
        menuToggleButton.addEventListener('click', function() {
            const isExpanded = menuToggleButton.getAttribute('aria-expanded') === 'true';
            menuToggleButton.setAttribute('aria-expanded', !isExpanded);
            dropdownMenu.classList.toggle('show'); 
        });

        document.addEventListener('click', function(event) {
            if (!dropdownMenu.contains(event.target) && !menuToggleButton.contains(event.target)) {
                if (dropdownMenu.classList.contains('show')) {
                    dropdownMenu.classList.remove('show');
                    menuToggleButton.setAttribute('aria-expanded', 'false');
                }
            }
        });

        const menuLinks = dropdownMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                dropdownMenu.classList.remove('show');
                menuToggleButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
    acessibilidadeBtn.addEventListener('click', function() {
        leituraAtiva = !leituraAtiva;
        localStorage.setItem('leituraAtiva', leituraAtiva);

        acessibilidadeBtn.textContent = leituraAtiva ? 'Desativar Leitor de Tela' : 'Ativar Leitor de Tela';

        if (!leituraAtiva) {
            window.speechSynthesis.cancel();
        }
    });

    document.body.addEventListener('mouseover', function(event) {
        if (leituraAtiva) {
            const texto = event.target.innerText || event.target.alt;
            if (texto) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(texto);
                utterance.lang = 'pt-BR';
                window.speechSynthesis.speak(utterance);
            }
        }
    });
});
