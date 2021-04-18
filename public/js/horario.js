const CreateNote = () => {
  var caja = document.getElementById("dashboard");
  caja.className = "hiden";
  caja.innerHTML = `
    <div id="shadow"></div>
      <div class="form">
        <form action="/new-note" method="post">
          <h5>Create Note!</h5>
          <input type="text" name="title" id="title" placeholder="Title of your note">
          <input type="date" name="date" id="date">
          <textarea name="description" id="description" cols="30" rows="15" placeholder="Description of this note?"></textarea>
          <input id = "save-btn" type="submit" class="btn green-btn" value="Save!">
        </form>
        <button class="btn red-btn" id = "cancel-btn" onclick="cancel()">Cancel</button>
      </div>
    `
}
const cancel = () => {
  var caja = document.getElementById("dashboard");
  caja.className = "shadow"
  caja.innerHTML = ""
}
const deletable = (id) => {
  var caja = document.getElementById("dashboard");
  caja.className = "hiden";
  caja.innerHTML = `
  <div id="shadow"></div>
  <div class="form" style="height: 30%;">
    <form action="/delete-note/${id}" method="post">
      <h5>Are you sure to delete this?</h5>
      <input id = "title" name="password" type="password" placeholder="Enter your password">
      <input id = "save-btn" type="submit" class="btn green-btn" value="Delete">
    </form>
    <button class="btn red-btn" id = "cancel-btn" onclick="cancel()">Cancel</button>
  </div>
  `
}
const edit = async (id) => {
  let data
  await fetch('/api/' + id)
    .then(result => result.json())
    .then(result => { data = result })
  var caja = document.getElementById("dashboard");
  caja.className = "hiden";
  caja.innerHTML = `
  <div id="shadow"></div>
  <div class="form">
    <form action="/edit-note/${data.id}" method="post">
      <h5>Edit a Note!</h5>
      <input type="text" name="title" id="title" placeholder="Title of your note" value="${data.title}">
      <input type="date" name="date" id="date" value="${parseDate(data.date)}">
      <textarea name="description" id="description" cols="30" rows="15" placeholder="Description of this note?">${data.description}</textarea>
      <input id = "save-btn" type="submit" class="btn green-btn" value="Save!">
    </form>
    <button class="btn red-btn" id = "cancel-btn" onclick="cancel()">Cancel</button>
  </div>
  `
}
const parseDate = (dateRaw) => {
  let a = new Date().toISOString(dateRaw).replace('T', '-').split('-')
  return `${a[0]}-${a[1]}-${a[2]}`
}