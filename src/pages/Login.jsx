import React, { useState } from 'react';
import { useAuth } from '../constantes/validarUsuario';
import '../styles/style.css';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { login } = useAuth();

    const user = "Admin";
    const pass = "123456";

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (usuario === user && contrasena === pass) {
            login(usuario);
            window.location.href = "/";
        } else {
            setUsuario('');
            setContrasena('');
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <main className="d-flex justify-content-center align-items-center vh-100">
                <div className="w-50 w-md-25 text-center">
                    <h2>Inicio de sesión</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="usuario">Usuario:</label>
                            <input 
                                type="text" 
                                name="usuario" 
                                id="usuario" 
                                className="form-control"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contraseña">Contraseña:</label>
                            <input 
                                type="password" 
                                name="contraseña" 
                                id="contraseña" 
                                className="form-control"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <button 
                                type="submit" 
                                className="btn btn-secondary"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {showModal && (
                <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Error</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Usuario o contraseña incorrecta</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;