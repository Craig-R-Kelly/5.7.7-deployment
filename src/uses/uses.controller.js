const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));
const urls = require(path.resolve("src/data/urls-data")); 

/*
The AND operator is used here to conditionally enable error handling for nested routes but not primary routes.  Only if the AND operator's first condition is truthy will subsequent logic be considered.  No point in searching through the data's urls for an .id which matches a urlId parameter if such parameter is not even present.
/*

/*
GET /uses                    [primary route]
GET /urls/:urlId/uses        [nested route]
"Retrieve a list of all use metrics"
Returns an array of all use metric objects in the response to the client.
If a urlId is provided, it filters the uses to only those associated with the given URL ID.
*/
function list(req, res) {
  console.log("All use records:", uses);
  const { urlId } = req.params;
  const urlExists = urls.some(url => url.id == urlId);
  console.log("urlExists:", urlExists);
  if (urlId && !urlExists) {
    return res.status(404).json({ error: `URL not found: ${urlId}` });
  }
  res.json({ data: uses });
}

/*
GET /uses/:useId             [primary route]
GET /urls/:urlId/uses/:useId [nested route]
"Retrieve a use metric by ID"
Checks for the existence of the use ID and returns the corresponding use metric object if found
Returns a 404 error if the use metric or the URL ID provided does not exist.
*/
function read(req, res) {
  const { urlId, useId } = req.params;
  const urlExists = urls.some(url => url.id == urlId);
  console.log("urlExists:", urlExists);
  if (urlId && !urlExists) {
    return res.status(404).json({ error: `URL not found: ${urlId}` });
  }
  const use = uses.find(use => use.id == useId);
  if (!use) {
    return res.status(404).json({ error: `Use metric not found: ${useId}` });
  }
  res.json({ data: use });
}

/*
DELETE /uses/:useId
"Delete a use metric by ID"
Removes a use metric from the array and returns a 204 status code on success.
Returns a 404 error if the use metric to be deleted does not exist.
*/
function destroy(req, res) {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id == useId);
  if (index === -1) {
    return res.status(404).json({ error: `Use ID not found: ${useId}` }); // index = -1 if .findIndex() can find no such instances as that described in its condition
  } else {
    uses.splice(index, 1); // Remove the use record from the array
    return res.sendStatus(204);
  }
}

module.exports = {
  list,
  read,
  destroy
};