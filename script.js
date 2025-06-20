    document.addEventListener('DOMContentLoaded', function() {
        const menuToggleButton = document.getElementById('menuToggle');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const acessibilidadeBtn = document.getElementById('acessibilidadeBtn');

        let leituraAtiva = localStorage.getItem('leituraAtiva') === 'true';

        if (acessibilidadeBtn) {
            acessibilidadeBtn.textContent = leituraAtiva ? 'Desativar Leitor de Tela' : 'Ativar Leitor de Tela';
        }

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

        function lerConteudoPrincipal() {
            const mainContent = document.querySelector('main');
            let textoCompleto = '';

            if (mainContent) {
                mainContent.querySelectorAll('h1, h2, h3, p, span, li, img').forEach(el => {
                    if (el.tagName.toLowerCase() === 'img' && el.alt) {
                        textoCompleto += el.alt + '. ';
                    } else if (el.innerText && el.innerText.trim() !== '') {
                        textoCompleto += el.innerText.trim() + '. ';
                    }
                });

                if (textoCompleto) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(textoCompleto);
                    utterance.lang = 'pt-BR';
                    window.speechSynthesis.speak(utterance);
                }
            }
        }

        if (acessibilidadeBtn) {
            acessibilidadeBtn.addEventListener('click', function() {
                leituraAtiva = !leituraAtiva;
                localStorage.setItem('leituraAtiva', leituraAtiva);
                acessibilidadeBtn.textContent = leituraAtiva ? 'Desativar Leitor de Tela' : 'Ativar Leitor de Tela';

                if (leituraAtiva) {
                    lerConteudoPrincipal();
                } else {
                    window.speechSynthesis.cancel();
                }
            });
        }

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

        document.body.addEventListener('touchstart', function(event) {
            if (leituraAtiva) {
                const texto = event.target.innerText || event.target.alt;

                if (texto) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(texto);
                    utterance.lang = 'pt-BR';
                    window.speechSynthesis.speak(utterance);
                }
            }
        }, { passive: true });

    });  
