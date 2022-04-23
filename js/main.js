const links = [
  { label: 'Week 1', url: 'week01/index.html' }
];

const ol = document.getElementById('assignments');   
links.forEach(link => {
  let li = document.createElement('li');
  let a = document.createElement('a');
  a.setAttribute('href', link.url);
  a.innerText = link.label;
  li.appendChild(a);
  ol.appendChild(li);
});

