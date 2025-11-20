import React, { useState, useEffect } from "react";
import '../styles/editPerfil.css';  // Importa el archivo CSS

function EditPerfil() {
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [maxFecha, setMaxFecha] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [sexo, setSexo] = useState('');
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const today = new Date();
    setMaxFecha(today.toISOString().split('T')[0]);

    const cargarDatosUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('No se encontró token de autenticación');

      try {
        const response = await fetch('http://localhost:8081/Usuarios/Perfil', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();

          setNombre(data.nombre || '');
          setCorreo(data.correo || '');
          setCelular(data.telefono || '');
          setSexo(data.sexo || '');
          setFechaNacimiento(data.fechaNacimiento || '');
          setPais(data.pais || '');
          setCiudad(data.ciudad || '');
          setDireccion(data.direccion || '');
        } else {
          const error = await response.text();
          setError('Error al cargar datos: ' + error);
        }
      } catch (err) {
        console.error(err);
        setError('Error de conexión con el servidor');
      }
    };

    cargarDatosUsuario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No se encontró token de autenticación');
      return;
    }

    const payload = {
      nombre,
      correo,
      telefono: celular,
      sexo,
      fechaNacimiento,
      pais,
      ciudad,
      direccion
    };

    try {
      const response = await fetch('http://localhost:8081/Usuarios/Editar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Usuario actualizado correctamente');
        console.log(data);
      } else if (response.status === 401) {
        alert('Token inválido o ausente');
      } else if (response.status === 404) {
        alert('Usuario no encontrado');
      } else {
        const error = await response.text();
        alert('Error al actualizar: ' + error);
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <form id="formEditarPerfil" onSubmit={handleSubmit} autoCapitalize="off">
        <div className="mb-3 input-group">
          <span className="input-group-text"><i className="bi bi-person"></i></span>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            required
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text"><i className="bi bi-envelope"></i></span>
          <input
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text"><i className="bi bi-phone"></i></span>
          <input
            type="text"
            className="form-control"
            placeholder="Celular"
            value={celular}
            onChange={e => setCelular(e.target.value)}
            pattern="[0-9]+"
            minLength="8"
            maxLength="15"
            required
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text"><i className="bi bi-gender-ambiguous"></i></span>
          <select
            className="form-control"
            value={sexo}
            onChange={e => setSexo(e.target.value)}
            required
          >
            <option value="" disabled>Selecciona tu sexo</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text"><i className="bi bi-cake"></i></span>
          <input
            type="date"
            className="form-control"
            value={fechaNacimiento}
            onChange={e => setFechaNacimiento(e.target.value)}
            max={maxFecha}
            required
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text"><i className="bi bi-globe-americas"></i></span>
          <input
            type="text"
            className="form-control"
            placeholder="País"
            value={pais}
            onChange={e => setPais(e.target.value)}
            pattern="^[A-Za-z]+$"
            minLength="3"
            maxLength="30"
            required
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text"><i className="bi bi-buildings"></i></span>
          <input
            type="text"
            className="form-control"
            placeholder="Ciudad"
            value={ciudad}
            onChange={e => setCiudad(e.target.value)}
            pattern="^[A-Za-z]+$"
            minLength="3"
            maxLength="30"
            required
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
          <input
            type="text"
            className="form-control"
            placeholder="Dirección"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
            minLength="3"
            maxLength="50"
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-color btn-lg">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

export default EditPerfil;
