import React, { useState, useEffect } from "react";
import '../styles/editPerfil.css';
import Logo from '../assets/img/icons/logo.png';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [maxFecha, setMaxFecha] = useState('');
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [contraseñaIncorrecta, setContraseñaIncorrecta] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const closeSuccessModal = () => setShowSuccessModal(false);



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

  setContraseñaActual('');
  setShowSuccessModal(true); 
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

      {showSuccessModal && (
  <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Éxito</h5>
          <button type="button" className="btn-close" onClick={closeSuccessModal}></button>
        </div>
        <div className="modal-body">
          <p>Los cambios se han guardado correctamente.</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={closeSuccessModal}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </main>
  );
}

export default Perfil;

