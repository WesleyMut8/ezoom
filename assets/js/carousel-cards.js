document.addEventListener('DOMContentLoaded', () => {
  const jsonData = [
    { 
      title: "a DO CARD1",
      date: "10/01/2024",
      color: "#9B836B",
      background: "../assets/images/Rectangle8.png"
    },
    { 
      title: "d DO CARD2",
      date: "10/02/2024",
      color: "#24BEFF", 
      background: "../assets/images/Rectangle8.png"
    },
    {
      title: "c DO CARD2",
      date: "10/02/2024",
      color: "#24BEFF", 
      background: "../assets/images/Rectangle8.png"
    },
    { 
      title: "TITULO DO s",
      date: "10/02/2024",
      color: "#24BEFF", 
      background: "../assets/images/Rectangle8.png"
    },
    { 
      title: "TITULO DO a",
      date: "10/03/2024",
      color: "#FF632D",
      background: "../assets/images/Rectangle8.png"
    }
  ];

  function generateCards(data) {
    const container = document.getElementById('carousel-container');
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('slider-controls');

    data.forEach((item, index) => {
      // Gerar os cards
      const card = document.createElement('div');
      card.classList.add('carousel-card');
      card.style.position = 'relative';

      const colorLabel = document.createElement('div');
      colorLabel.classList.add('color-label');
      colorLabel.style.backgroundColor = item.color;

      const cardTexts = document.createElement('div');
      cardTexts.classList.add('card-texts');

      const title = document.createElement('span');
      title.classList.add('title');
      title.textContent = item.title;

      const date = document.createElement('span');
      date.classList.add('date');
      date.textContent = item.date;

      const cardButton = document.createElement('div');
      cardButton.classList.add('card-button');

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('class', 'bi bi-arrow-right');
      svg.setAttribute('viewBox', '0 0 16 16');

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute('d', 'M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8');

      svg.appendChild(path);
      cardButton.appendChild(svg);

      cardTexts.appendChild(title);
      cardTexts.appendChild(date);

      card.appendChild(colorLabel);
      card.appendChild(cardTexts);
      card.appendChild(cardButton);

      card.style.backgroundImage = `url(${item.background})`;
      card.style.backgroundPosition = 'center';
      card.style.backgroundSize = 'cover';

      card.style.setProperty('--move-button-color', item.color);

      container.appendChild(card);

      // Gerar os inputs do tipo radio e labels
      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = 'slider';
      radioInput.id = `slide${index + 1}`;
      if (index === 0) radioInput.checked = true;

      const label = document.createElement('label');
      label.htmlFor = `slide${index + 1}`;

      controlsContainer.appendChild(radioInput);
      controlsContainer.appendChild(label);
    });

    // Adicionar os controles ao documento
    const mainContent = document.getElementById('main-content');
    mainContent.insertBefore(controlsContainer, mainContent.children[2]); // Inserir após #carousel-container
  }

  generateCards(jsonData);

  // Função para atualizar a posição do slide
  function updateSlider() {
    const slides = document.querySelectorAll('.carousel-card');
    const radios = document.querySelectorAll('input[name="slider"]');
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
