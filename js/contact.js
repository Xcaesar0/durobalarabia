(function () {
  var form = document.querySelector('form[name="contact"]');
  if (!form) return;
  var group = form.querySelector('.contact-group');
  var count = form.querySelector('[name="group-size"]');
  function updateGroup() {
    var choice = form.querySelector('[name="participation"]:checked');
    var selected = choice && choice.value === 'group';
    group.hidden = !selected;
    count.disabled = !selected;
    count.required = !!selected;
  }
  form.addEventListener('change', updateGroup);
  updateGroup();
  var language = document.documentElement.lang;
  form.querySelector('[name="language"]').value = language;
  form.action = 'contact.html?sent=1&lang=' + language;
  if (new URLSearchParams(location.search).get('sent') === '1') {
    form.hidden = true;
    document.querySelector('.contact-success').hidden = false;
  }
})();
