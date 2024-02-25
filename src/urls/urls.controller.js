const path = require("path");
const urls = require(path.resolve("src/data/urls-data"))
const uses = require("../data/uses-data");

/*
POST /urls
"Create a new short URL"
Assigns an ID to the object, saves it, and returns the saved object as a response to the client
*/
function create(req, res) {
  const { data: { href } = {} } = req.body;
  if (!href) {
    return res.status(400).json({ error: "Missing 'href' property."});
  }
  const newUrlId = urls.length + 1;
  const newUrl = { href, id: newUrlId };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

/*
GET /urls/:urlId
"Retrieve a short URL by ID"
Additionally, it creates a use record as a side effect of this retrieval, tracking each time the URL is fetched
*/
function read(req, res) {
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (foundUrl) {
    const newUseId = uses.length + 1;
    const newUse = { id: newUseId, urlId: Number(urlId), time: Date.now() };
    uses.push(newUse);
    res.status(200).json({ data: foundUrl });
  } else {
    res.status(404).json({ error: `URL not found: ${urlId}` });
  }
}

/*
PUT /urls/:urlId
"Update a short URL by ID"
Updates the href of the given URL ID and returns the updated object
*/
function update(req, res) {
  const { urlId } = req.params;
  const { href } = req.body.data;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (foundUrl) {
    foundUrl.href = href;
    res.json({ data: foundUrl });
  } else {
    res.status(404).json({ error: `URL not found: ${urlId}`});
  }
}

/*
GET /urls
"Retrieve a list of all short URLs"
Returns an array of all URL objects in the response to the client
*/
function list(req, res) {
  res.json({ data: urls });
}


module.exports = { create, read, update, list };