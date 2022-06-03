const links = [
  { label: 'Week 1', url: 'week01/index.html' },
  { label: 'Week 2', url: 'week02/index.html' },
  { label: 'Week 3', url: 'week03/index.html' },
  { label: 'Week 4', url: 'week04/index.html' },
  { label: 'Week 5', url: 'week05/index.html' },
  { label: 'Week 6', url: 'week06/index.html' }'
   { label: 'Week 7', url: 'week07/index.html' }
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

