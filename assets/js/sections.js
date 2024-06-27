document.addEventListener("DOMContentLoaded", function() {
    fetch('assets/json/sections.json')
        .then(response => response.json())
        .then(data => generateSections(data))
        .catch(error => console.error('Error loading the JSON:', error));

    function generateSections(sections) {
        const sectionsContainer = document.querySelector('.sections-container');
        let isGray = true;

        sections.forEach((section, sectionIndex) => {
            const sectionBox = document.createElement('div');
            sectionBox.className = 'section-box';
            sectionBox.style.borderLeft = `.5rem solid ${section.color}`;
            sectionBox.style.backgroundColor = isGray ? '#f2f2f2' : '#ffffff';
            isGray = !isGray;

            const boxText = document.createElement('div');
            boxText.className = 'box-text';

            const title = document.createElement('h1');
            title.className = 'title';
            title.textContent = section.title;

            const subtitle = document.createElement('span');
            subtitle.className = 'content';
            subtitle.textContent = section.subtitle;

            const externalLink = document.createElement('a');
            externalLink.href = section.allNews;
            externalLink.className = 'external-link';
            externalLink.textContent = 'VER TODOS';
            externalLink.target = '_blank';

            boxText.appendChild(title);
            boxText.appendChild(subtitle);
            boxText.appendChild(externalLink);

            const boxCards = document.createElement('div');
            boxCards.className = 'box-cards';
            const sliderContainer = document.createElement('div');
            sliderContainer.className = 'carousel-container';
            boxCards.appendChild(sliderContainer);

            const controlsContainer = document.createElement('div');
            controlsContainer.classList.add('slider-controls');

            section.cards.forEach((card, cardIndex) => {
                const cardElement = document.createElement('a');
                cardElement.className = 'card';
                cardElement.href = card.url;
                cardElement.target = '_blank';

                const cardImage = document.createElement('div');
                cardImage.className = 'image';
                const img = document.createElement('img');
                img.src = card.imgUrl;
                img.alt = 'imagem';
                cardImage.appendChild(img);

                const colorLabel = document.createElement('div');
                colorLabel.className = 'color-label-section';
                colorLabel.style.backgroundColor = section.color;

                const cardTexts = document.createElement('div');
                cardTexts.className = 'card-texts-section';

                const cardTitle = document.createElement('h1');
                cardTitle.className = 'title';
                cardTitle.textContent = card.title;

                const cardContent = document.createElement('span');
                cardContent.className = 'content';
                cardContent.textContent = card.date;

                cardTexts.appendChild(cardTitle);
                cardTexts.appendChild(cardContent);

                const cardButton = document.createElement('div');
                cardButton.className = 'card-button';
                cardButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                `;

                cardElement.appendChild(cardImage);
                cardElement.appendChild(colorLabel);
                cardElement.appendChild(cardTexts);
                cardElement.appendChild(cardButton);

                 // Adiciona a cor de background ao card
                cardElement.addEventListener('mouseover', () => {
                    cardTexts.style.backgroundColor = section.color;
                });
                cardElement.addEventListener('mouseout', () => {
                    cardTexts.style.backgroundColor = '';
                });
                
                sliderContainer.appendChild(cardElement);

                // Gerar os inputs do tipo radio e labels para o slider
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `slider-${sectionIndex}`;
                radioInput.id = `slide${sectionIndex}-${cardIndex + 1}`;
                if (cardIndex === 0) radioInput.checked = true;

                const label = document.createElement('label');
                label.htmlFor = `slide${sectionIndex}-${cardIndex + 1}`;

                if (!radioInput.checked) {
                    label.classList.add('not-checked');
                } else {
                    label.classList.add('checked');
                    label.style.backgroundColor = section.color;
                    label.style.borderColor = section.color;
                }

                controlsContainer.appendChild(radioInput);
                controlsContainer.appendChild(label);

                // Adiciona evento para mudar as classes dinamicamente
                radioInput.addEventListener('change', () => {
                    controlsContainer.querySelectorAll('label').forEach(lbl => {
                        lbl.classList.remove('checked');
                        lbl.classList.add('not-checked');
                        lbl.style.backgroundColor = '#FFFFFF';
                        lbl.style.borderColor = '#121212';
                    });
                    label.classList.add('checked');
                    label.classList.remove('not-checked');
                    label.style.backgroundColor = section.color;
                    label.style.borderColor = section.color;
                });
            });

            sectionBox.appendChild(boxText);
            sectionBox.appendChild(boxCards);
            sectionBox.appendChild(controlsContainer);

            sectionsContainer.appendChild(sectionBox);

            // Função para atualizar a posição do slide
            function updateSlider() {
                const slides = sliderContainer.querySelectorAll('.card');
                const radios = controlsContainer.querySelectorAll(`input[name="slider-${sectionIndex}"]`);
                radios.forEach((radio, index) => {
                    radio.addEventListener('change', () => {
                        slides.forEach((slide) => {
                            slide.style.transform = `translateX(-${index * 100}%)`;
                        });
                    });
                });
            }

            updateSlider();
        });
    }
});
