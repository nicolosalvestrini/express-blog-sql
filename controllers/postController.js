const posts = require("../data/data");
// Importiamo il file di connessione al database
const connection = require("../data/db");
// Index

function index(req, res) {
  // query

  const sql = "SELECT * FROM posts";

  // esecuzione query

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

function show(req, res) {

  const { id } = req.params;

  // query post
  const postsSql = `
    SELECT *
    FROM posts
    WHERE id = ?
  `;

  // query tags collegati al post
  const tagsSql = `
    SELECT T.*
    FROM tags T
    JOIN post_tag PT
      ON T.id = PT.tag_id
    WHERE PT.post_id = ?
  `;

  connection.query(postsSql, [id], (err, postResults) => {

    if (err) {
      return res.status(500).json({
        error: "Database query failed"
      });
    }

    if (postResults.length === 0) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    // recuperiamo il post
    const post = postResults[0];

    // recuperiamo i tag
    connection.query(tagsSql, [id], (err, tagsResults) => {

      if (err) {
        return res.status(500).json({
          error: "Database query failed"
        });
      }

      // aggiungiamo tags al post
      post.tags = tagsResults;

      res.json(post);

    });

  });

}
function store(req, res) {

  const {title, content, image} = req.body
  const sql = `INSERT INTO posts (title, content, image) VALUES ( ?, ?, ?)`

  connection.query(sql, [title, content, image], (err, results) => {
    if(err) {return res.status(505).json({error : 'store failed'})}
    res.status(201)
    res.json({ id: results.insertId })
  })
  
}

function update(req, res) {
  const {id} = req.params

  const {title, content, image} = req.body

  const sql = `UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?`

  connection.query(sql, [title, content, image, id], (err) => {
    if(err)return res.status(500).json({error : 'failed update post'});
    res.json({message : 'update sucesfully'})
  })

}

function patch(req, res) {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404).json({
      error: "non esiste alcun post con questo id",
    });
    return;
  }

  if (req.body.titolo !== undefined) {
    post.titolo = req.body.titolo;
  }

  if (req.body.contenuto !== undefined) {
    post.contenuto = req.body.contenuto;
  }

  if (req.body.immagine !== undefined) {
    post.immagine = req.body.immagine;
  }

  if (req.body.tags !== undefined) {
    post.tags = req.body.tags;
  }

  res.json(post);
}

function destroy(req, res) {
  const id = parseInt(req.params.id);

  const sql = "DELETE FROM posts WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to delete post",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, patch, destroy };
