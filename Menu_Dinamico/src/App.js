import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import DisplayJSON from './componentes/DisplayJSON';

const data = [
    { id: 1, nombre: "Inicio", enlace: "https://www.google.com/webhp?hl=es-419&sa=X&ved=0ahUKEwjZx6flhfKLAxUNmIQIHT1kH7QQPAgI", submenu: [] },
    { id: 2, nombre: "Servicios", enlace: "/servicios", submenu: [{ id: 1, nombre: "Desarrollo Web", enlace: "/Servicios/desarrollo-web" }, { id: 2, nombre: "Aplicacion Movil", enlace: "/servicios/app-mobile", submenu: [] }] },
    { id: 3, nombre: "V", enlace: "#", submenu: [{ id: 1, nombre: "VVVV", enlace: "https://x.com/Google?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" }] },
    { id: 4, nombre: "Otros Servicios", enlace: "https://www.youtube.com/", submenu: [] },
    { id: 5, nombre: "Contacto", enlace: "#", submenu: [] }
];

class App_2 extends React.Component {
    state = {
        data: data,
        form: { id: '', nombre: '', enlace: '', submenu: [] },
        modalInsertar: false,
        modalEditar: false,
        submenuForm: { id: '', nombre: '', enlace: '', submenu: [] },
        modalInsertarSubmenu: false,
        modalEditarSubmenu: false,
        parentMenu: null,
    }

    handleChange = e => {
        this.setState({
            form: { ...this.state.form, [e.target.name]: e.target.value }
        });
    }

    handleSubmenuChange = e => {
        this.setState({
            submenuForm: { ...this.state.submenuForm, [e.target.name]: e.target.value }
        });
    }

    mostrarModalInsertar = () => {
        this.setState({ modalInsertar: true });
    }

    ocultarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    }

    mostrarModalEditar = (registro) => {
        this.setState({ modalEditar: true, form: registro });
    }

    ocultarModalEditar = () => {
        this.setState({ modalEditar: false });
    }

    mostrarModalInsertarSubmenu = (parentMenu) => {
        this.setState({ modalInsertarSubmenu: true, parentMenu });
    }

    ocultarModalInsertarSubmenu = () => {
        this.setState({ modalInsertarSubmenu: false, parentMenu: null });
    }

    mostrarModalEditarSubmenu = (submenu, parentmenu) => {
        this.setState({ modalEditarSubmenu: true, submenuForm: submenu, parentMenu:parentmenu });
    }

    ocultarModalEditarSubmenu = () => {
        this.setState({ modalEditarSubmenu: false, parentMenu: null });
    }

    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        valorNuevo.submenu = [];
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ data: lista, modalInsertar: false });
    }

    editar = (dato) => {
        var lista = this.state.data.map((registro) =>
            dato.id === registro.id ? { ...registro, nombre: dato.nombre, enlace: dato.enlace } : registro
        );
        this.setState({ data: lista, modalEditar: false });
    }

    eliminar = (dato) => {
        var opcion = window.confirm("Realmente desea eliminar el registro " + dato.id);
        if (opcion) {
            var lista = this.state.data.filter((registro) => registro.id !== dato.id);
            this.setState({ data: lista });
        }
    }

    insertarSubmenu = () => {
        const { parentMenu, submenuForm, data } = this.state;
        const newSubmenu = { ...submenuForm, id: parentMenu.submenu.length + 1 };
        const updatedData = data.map(menu =>
            menu.id === parentMenu.id ? { ...menu, submenu: [...menu.submenu, newSubmenu] } : menu
        );
        this.setState({ data: updatedData, modalInsertarSubmenu: false });
    }

    editarSubmenu = (dato) => {
        const { parentMenu, data } = this.state;
        const updatedSubmenu = parentMenu.submenu.map(sub =>
            sub.id === dato.id ? { ...sub, nombre: dato.nombre, enlace: dato.enlace } : sub
        );
        const updatedData = data.map(menu =>
            menu.id === parentMenu.id ? { ...menu, submenu: updatedSubmenu } : menu
        );
        this.setState({ data: updatedData, modalEditarSubmenu: false });
    }

    eliminarSubmenu = (submenu) => {
        const { parentMenu, data } = this.state;
        var opcion = window.confirm("Realmente desea eliminar el submenú " + submenu.id);
        if (opcion) {
            const updatedSubmenu = parentMenu.submenu.filter(sub => sub.id !== submenu.id);
            const updatedData = data.map(menu =>
                menu.id === parentMenu.id ? { ...menu, submenu: updatedSubmenu } : menu
            );
            this.setState({ data: updatedData });
        }
    }

    renderSubmenu = (submenu,parentMenu) => {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Id Sub menu</th>
                        <th>Nombre</th>
                        <th>Enlace</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {submenu.map((sub) => (
                        <tr key={sub.id}>
                            <td>{sub.id}</td>
                            <td>{sub.nombre}</td>
                            <td>{sub.enlace}</td>
                            <td>
                                <Button color='primary' onClick={() => this.mostrarModalEditarSubmenu(sub, parentMenu)}>Editar</Button>{" "}
                                <Button color='danger' onClick={() => this.eliminarSubmenu(sub)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    render() {
        return (
            <>
                <div id="cuerpo">
                    <h2>Menu dinámico</h2>
                </div>
                <DisplayJSON data={this.state.data} />
                <div id='Formulario'>
                    <Container>
                        <br />
                        <Button color='success' onClick={() => this.mostrarModalInsertar()}>Insertar Nuevo Menu</Button>
                        <br />

                        <Table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Enlace</th>
                                    <th>Sub Menu</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((elemento) => (
                                    <tr key={elemento.id}>
                                        <td>{elemento.id}</td>
                                        <td>{elemento.nombre}</td>
                                        <td>{elemento.enlace}</td>
                                        <td>{elemento.submenu.length > 0 ? this.renderSubmenu(elemento.submenu,elemento) : 'No tiene submenú'}</td>
                                        <td>
                                            <Button color='primary' onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>{" "}
                                            <Button color='danger' onClick={() => this.eliminar(elemento)}>Eliminar</Button>
                                            <Button color='success' onClick={() => this.mostrarModalInsertarSubmenu(elemento)}>Insertar Submenú</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>

                    <Modal isOpen={this.state.modalInsertar}>
                        <ModalHeader>
                            <div><h3>Insertar Registro</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>Id:</label>
                                <input className='form-control' readOnly type='text' value={this.state.data.length + 1} />
                            </FormGroup>

                            <FormGroup>
                                <label>Nombre:</label>
                                <input className='form-control' name='nombre' type='text' onChange={this.handleChange} />
                            </FormGroup>

                            <FormGroup>
                                <label>Enlace:</label>
                                <input className='form-control' name='enlace' type='text' onChange={this.handleChange} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color='primary' onClick={() => this.insertar()}>Insertar</Button>
                            <Button color='danger' onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalEditar}>
                        <ModalHeader>
                            <div><h3>Editar Registro</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>Id:</label>
                                <input className='form-control' readOnly type='text' value={this.state.form.id} />
                            </FormGroup>

                            <FormGroup>
                                <label>Nombre:</label>
                                <input className='form-control' name='nombre' type='text' onChange={this.handleChange} value={this.state.form.nombre} />
                            </FormGroup>

                            <FormGroup>
                                <label>Enlace:</label>
                                <input className='form-control' name='enlace' type='text' onChange={this.handleChange} value={this.state.form.enlace} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color='primary' onClick={() => this.editar(this.state.form)}>Editar</Button>
                            <Button color='danger' onClick={() => this.ocultarModalEditar()}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalInsertarSubmenu}>
                        <ModalHeader>
                            <div><h3>Insertar Submenú</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>Id:</label>
                                <input className='form-control' readOnly type='text' value={this.state.parentMenu ? this.state.parentMenu.submenu.length + 1 : ''} />
                            </FormGroup>

                            <FormGroup>
                                <label>Nombre:</label>
                                <input className='form-control' name='nombre' type='text' onChange={this.handleSubmenuChange} />
                            </FormGroup>

                            <FormGroup>
                                <label>Enlace:</label>
                                <input className='form-control' name='enlace' type='text' onChange={this.handleSubmenuChange} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color='primary' onClick={() => this.insertarSubmenu()}>Insertar</Button>
                            <Button color='danger' onClick={() => this.ocultarModalInsertarSubmenu()}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalEditarSubmenu}>
                        <ModalHeader>
                            <div><h3>Editar Submenú</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>Id:</label>
                                <input className='form-control' readOnly type='text' value={this.state.submenuForm.id} />
                            </FormGroup>

                            <FormGroup>
                                <label>Nombre:</label>
                                <input className='form-control' name='nombre' type='text' onChange={this.handleSubmenuChange} value={this.state.submenuForm.nombre} />
                            </FormGroup>

                            <FormGroup>
                                <label>Enlace:</label>
                                <input className='form-control' name='enlace' type='text' onChange={this.handleSubmenuChange} value={this.state.submenuForm.enlace} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color='primary' onClick={() => this.editarSubmenu(this.state.submenuForm)}>Editar</Button>
                            <Button color='danger' onClick={() => this.ocultarModalEditarSubmenu()}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default App_2;