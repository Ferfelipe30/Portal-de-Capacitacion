import React, { useState } from "react";
import {Box, Button} from "@mui/material";
import type { Usuario } from '../types/types';
import UsuarioModal from "../components/CreateUsuario";
import useUsuario from "../hooks/useUsuario";

const UsuarioScreen: React.FC = () => {
    useUsuario();
    const [modalOpen, setModalOpen] = useState(false);
    const [usuarioToEdit, setUsuarioToEdit] = useState<Usuario | null>(null);

    const handleCreate = () => {
        setUsuarioToEdit(null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSuccess = () => {
        setModalOpen(false);
    };

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleCreate}>
                Crear Usuario
            </Button>
            <UsuarioModal
                open={modalOpen}
                initialData={usuarioToEdit || undefined}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
            />
        </Box>
    );
};

export default UsuarioScreen;