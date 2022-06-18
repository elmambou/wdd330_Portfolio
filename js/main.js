const links = {
  block1: [
      { label: "Week 1 Report and Content ", url: 'w01/index.html'},
      { label: "Week 2 Report and Content", url: 'w02/index.html'},
      { label: "Week 3 Report and Content", url: 'w03/index.html'},
      { label: "Week 4 Report and Content", url: 'w04/index.html'},
      { label: "Week 5 Report and Content", url: 'w05/index.html'},
      { label: "Week 6 Report and Content", url: 'w06/index.html'},
      { label: "Week 7 Report and Content", url: 'w07/index.html'}
  ],

  block2: [
      { label: "Week 8 Report and Content", url: 'w08/index.html'},
      { label: "Week 9 Report and Content", url: 'w09/index.html'},
      { label: "Week 10 Report and Content", url: 'w10/index.html'},
      { label: "Week 11 Report and Content", url: 'w11/index.html'},
      { label: "Week 12 Report and Content", url: 'w12/index.html'},
      { label: "Week 13 Report and Content", url: 'w13/index.html'},
      { label: "Week 14 Report and Content", url: 'w14/index.html'},
  ]
}
const ol = document.getElementById('assignments');   
links.forEach(link => {
  let li = document.createElement('li');
  let a = document.createElement('a');
  a.setAttribute('href', link.url);
  a.innerText = link.label;
  li.appendChild(a);
  ol.appendChild(li);
});

