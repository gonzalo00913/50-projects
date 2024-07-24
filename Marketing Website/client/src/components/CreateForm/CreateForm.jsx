import React from 'react'
import { useState } from 'react'
import contentService from '../../services/contentService'

const CreateForm = ({ setContent }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('No estás autenticado');
        return;
      }

      contentService.setToken(token)

      const newPost = {
        title,
        image,
        description,
      }

      const createdPost = await contentService.create(newPost, token)
      setContent(prevContent => [...prevContent, createdPost])

      setTitle('');
      setImage('');
      setDescription('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div>
    <h2>Crear Publicación</h2>
    {error && <div style={{ color: 'red' }}>{error}</div>}
    <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  )
}

export default CreateForm
