import React, { useState, useEffect } from "react";
import '../styles/editPerfil.css';
import Logo from '../assets/img/icons/logo.png';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [maxFecha, setMaxFecha] = useState('');
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [contraseñaIncorrecta, setContraseñaIncorrecta] = useState(false);

  // Cargar usuario activo
  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuarioActivo) {
      setUsuario({
        nombre: usuarioActivo.nombre || '',
        correo: usuarioActivo.correo || '',
        celular: usuarioActivo.celular || '',
        genero: usuarioActivo.genero || '',
        fechaNacimiento: usuarioActivo.fechaNacimiento || '',
        pais: usuarioActivo.pais || '',
        ciudad: usuarioActivo.ciudad || '',
        direccion: usuarioActivo.direccion || '',
        contrasena: usuarioActivo.contrasena || '',
        usuario: usuarioActivo.usuario || ''
      });
    }
    const today = new Date();
    setMaxFecha(today.toISOString().split('T')[0]);
  }, []);

  if (!usuario) {
    return (
      <main className="edit-perfil-container text-center">
        <p>Cargando perfil...</p>
      </main>
    );
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario(prev => ({ ...prev, [id]: value }));
  };

  const handleGuardarCambios = (e) => {
    e.preventDefault();

    if (contraseñaActual !== usuario.contrasena) {
      setContraseñaIncorrecta(true);
      return;
    }

    setContraseñaIncorrecta(false);
    setEditando(false);

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const usuariosActualizados = usuariosRegistrados.map(u =>
      u.usuario === usuario.usuario ? usuario : u
    );

    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosActualizados));
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));

    alert('Cambios guardados correctamente.');
    setContraseñaActual('');
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    if (editando) {
      handleGuardarCambios(e);
    } else {
      setEditando(true);
    }
  };

  return (
    <main className="edit-perfil-container">
      <div className="perfil-header">
        <div className="perfil-imagen">
          <img src={Logo} alt="Imagen de perfil" className="img-fluid rounded-circle" />
        </div>
        <div className="perfil-info">
          <h2 className="text-center mb-4">Mi perfil</h2>
          <div className="card shadow-sm p-4">
            <form>
              {/* Nombre */}
              <div className="mb-3 input-group">
                <span className="input-group-text">Nombre:</span>
                {editando ? (
                  <input type="text" id="nombre" value={usuario.nombre} onChange={handleChange} className="form-control" required />
                ) : (
                  <span className="form-control bg-light text-muted">{usuario.nombre || '...'}</span>
                )}
              </div>

              {/* Correo */}
              <div className="mb-3 input-group">
                <span className="input-group-text">Correo:</span>
                {editando ? (
                  <input type="email" id="correo" value={usuario.correo} onChange={handleChange} className="form-control" required />
                ) : (
                  <span className="form-control bg-light text-muted">{usuario.correo || '...'}</span>
                )}
              </div>

              {/* Celular */}
              <div className="mb-3 input-group">
                <span className="input-group-text">Celular:</span>
                {editando ? (
                  <input type="text" id="celular" value={usuario.celular} onChange={handleChange} className="form-control" />
                ) : (
                  <span className="form-control bg-light text-muted">{usuario.celular || '...'}</span>
                )}
              </div>

              {/* Género */}
              <div className="mb-3 input-group">
                <span className="input-group-text">Género:</span>
                {editando ? (
                  <select id="genero" value={usuario.genero} onChange={handleChange} className="form-control">
                    <option value="">Selecciona tu género</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                ) : (
                  <span className="form-control bg-light text-muted">{usuario.genero || '...'}</span>
                )}
              </div>

              {/* Fecha de nacimiento */}
              <div className="mb-3 input-group">
                <span className="input-group-text">Fecha de Nacimiento:</span>
                {editando ? (
                  <input type="date" id="fechaNacimiento" value={usuario.fechaNacimiento} onChange={handleChange} className="form-control" max={maxFecha} />
                ) : (
                  <span className="form-control bg-light text-muted">{usuario.fechaNacimiento || '...'}</span>
                )}
              </div>

              {/* País */}
              <div className="mb-3 input-group">
                <span className="input-group-text">País:</span>
                {editando ? (
                  <input type="text" id="pais" value={usuario.pais} onChange={handleChange} className="form-control" />
                ) : (
                  <span className="form-control bg-light text-muted">{usuario.pais || '...'}</span>
                )}
              </div>

              {/* Ciudad */}
              <div className="mb-3 input-group">
                <span className="input-group-text">Ciudad:</span>
                {editando ? (
                  <input type="text" id="ciudad" value={usuario.ciudad} onChange={handleChange} className="form-control" />
                ) : (
                  <span className="form-control bg-light text-muted">{usuario.ciudad || '...'}</span>
                )}
              </div>

              {/* Dirección */}
              <div className="mb-3 input-group">
                <span className="input-group-text">Dirección:</span>
                {editando ? (
                  <input type="text" id="direccion" value={usuario.direccion} onChange={handleChange} className="form-control" />
                ) : (
                  <span className="form-control bg-light text-muted">{usuario.direccion || '...'}</span>
                )}
              </div>

              {/* Contraseña actual */}
              {editando && (
                <div className="mb-3 input-group">
                  <span className="input-group-text">Contraseña actual:</span>
                  <input type="password" value={contraseñaActual} onChange={(e) => setContraseñaActual(e.target.value)} className="form-control" placeholder="Introduce tu contraseña actual" />
                </div>
              )}

              {contraseñaIncorrecta && (
                <div className="text-danger mb-3">
                  La contraseña actual es incorrecta.
                </div>
              )}

              {/* Botón Editar/Guardar */}
              <div className="mb-3 text-center">
                <button onClick={handleEditClick} className="btn btn-color btn-lg">
                  {editando ? 'Guardar Cambios' : 'Editar'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Perfil;


  /*
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [maxFecha, setMaxFecha] = useState('');
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [contraseñaIncorrecta, setContraseñaIncorrecta] = useState(false);

 

  // Fecha máxima para el campo de nacimiento (la fecha de hoy)
  useEffect(() => {
    const sesionActiva = JSON.parse(localStorage.getItem('usuarioActivo')); // Usuario logeado
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (sesionActiva) {
      const usuarioEncontrado = usuariosGuardados.find(
        (u) => u.usuario === sesionActiva.usuario
      );
      if (usuarioEncontrado) setUsuario(usuarioEncontrado);
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    setMaxFecha(today.toISOString().split('T')[0]);
  }, []);

  if (!usuario) {
    return (
      <main className="edit-perfil-container text-center">
        <p>Cargando perfil...</p>
      </main>
    );
  }
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [id]: value,
    }));
  };

   const handleGuardarCambios = (e) => {
    e.preventDefault();

if (contraseñaActual !== usuario.contraseña) {
      setContraseñaIncorrecta(true);
      return;
    }

    setContraseñaIncorrecta(false);
    setEditando(false);

const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuariosActualizados = usuariosGuardados.map((u) =>
      u.correo === usuario.correo ? usuario : u
    );
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));

    alert('Cambios guardados correctamente.');
  };

 const handleEditClick = (e) => {
    e.preventDefault();
    if (editando) {
      handleGuardarCambios(e);
    } else {
      setEditando(true);
    }
  };

  return (
    <main className="edit-perfil-container">
      <div className="perfil-header">
  
        <div className="perfil-imagen">
          <img 
            src={Logo}  // Usamos la variable 'Logo' como la fuente
            alt="Imagen de perfil"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="perfil-info">
          <h2 className="text-center mb-4">Mi perfil</h2>
          <div className="card shadow-sm p-4">
            <form id="formEditarPerfil">

      
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-person"> Nombre: </i></span>
                 {editando ? (
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre de usuario"
                  value={usuario.nombre}
                  onChange={handleChange}
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minlength="3"
                  maxlength="30"
                  required
                />) : (
                 <span className="form-control bg-light text-muted">{usuario.nombre || '...'}</span>
                 )}
              </div>
             

   
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-envelope"> Correo Electronico: </i></span>
            {editando ? (
            <input 
              type="email" 
              className="form-control" 
              id="correo" 
              placeholder="Correo electrónico" 
              value={usuario.correo}
              onChange={handleChange}
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.correo || '...'}</span>
                 )}
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-phone"> Celular: </i></span>
            {editando ? (
            <input 
              type="text" 
              className="form-control" 
              id="celular" 
              placeholder="Celular"
              value={usuario.celular}
              onChange={handleChange}
              pattern="[A-Za-z][A-Za-z0-9\-]*" 
              minlength="3" 
              maxlength="30" 
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.celular || '...'}</span>
                 )}
          </div>


          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-gender-ambiguous"> Genero: </i></span>
            {editando ? (
            <select 
              className="form-control" 
              id="genero" 
              value={usuario.genero} 
              onChange={handleChange} 
              required
            >
              <option value="" disabled>Selecciona tu genero</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>) : (
                 <span className="form-control bg-light text-muted">{usuario.genero || '...'}</span>
                 )}
          </div>


          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-cake"> Fecha de Nacimiento: </i></span>
           {editando ? (
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              value={usuario.fechaNacimiento}
              onChange={handleChange}
              required
              max={maxFecha}
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.fechaNacimiento || '...'}</span>
                 )}
          </div>

     
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-globe-americas"> Pais: </i></span>
            {editando ? (
            <input 
              type="text" 
              className="form-control" 
              id="pais" 
              placeholder="Pais"
              value={usuario.pais}
              onChange={handleChange}
              pattern="^[A-Za-z]+$" 
              minlength="3" 
              maxlength="30" 
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.pais || '...'}</span>
                 )}
          </div>

     
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-buildings"> Ciudad: </i></span>
            {editando ? (
            <input 
              type="text" 
              className="form-control" 
              id="ciudad" 
              placeholder="Ciudad"
              value={usuario.ciudad}
              onChange={handleChange}
              pattern="^[A-Za-z]+$" 
              minlength="3" 
              maxlength="30" 
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.ciudad || '...'}</span>
                 )}
          </div>

       
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-geo-alt">  Dirección: </i></span>
            {editando ? (
            <input 
              type="text" 
              className="form-control" 
              id="direccion" 
              placeholder="Dirección"
              value={usuario.direccion}
              onChange={handleChange}
              pattern="[A-Za-z][A-Za-z0-9\-]*" 
              minlength="3" 
              maxlength="30" 
              required 
            />) : (
                 <span className="form-control bg-light text-muted">{usuario.direccion || '...'}</span>
                 )}
          </div>

   
              {editando && (
                <div className="mb-3 input-group">
                  <span className="input-group-text">Contraseña actual:</span>
                  <input
                    type="password"
                    className="form-control"
                    value={contraseñaActual}
                    onChange={(e) => setContraseñaActual(e.target.value)}
                    placeholder="Introduce tu contraseña actual"
                  />
                </div>
              )}

         {contraseñaIncorrecta && (
        <div className="text- danger mb-3">
          La contraseña actual es incorrecta. Por favor, inténtalo de nuevo.
        </div>
      )}

      <div className="mb-3">
        <button
          onClick={handleEditClick} // Pasa el evento correctamente aquí
          className="btn btn-color btn-lg"
        >
          {editando ? 'Guardar Cambios' : 'Editar'}
        </button>
      </div>
            </form>
          </div>
        </div>
      </div>
      <div className="text-center">
                <button onClick={handleEditClick} className="btn btn-color btn-lg">
                  {editando ? "Guardar Cambios" : "Editar"}
                </button>
              </div>

       
      
    </main>
  );
};

export default Perfil;*/
