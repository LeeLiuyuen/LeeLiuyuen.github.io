fetch('data/fursuits.json')
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById('gallery');
    data.forEach(suit => {
      const section = document.createElement('div');
      section.className = 'suit';

      const header = document.createElement('h2');
      header.textContent = `${suit.id} - ${suit.customer} (${suit.species})`;
      section.appendChild(header);

      const imagesDiv = document.createElement('div');
      imagesDiv.className = 'suit-images';

      suit.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${suit.id} image`;
        imagesDiv.appendChild(img);
      });

      section.appendChild(imagesDiv);
      gallery.appendChild(section);
    });
  })
  .catch(err => {
    console.error('Failed to load fursuit data:', err);
  });
