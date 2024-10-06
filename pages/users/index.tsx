"use client"

import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import DashboardLayout from '@/components/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoaderCircle, Pencil } from 'lucide-react';
import { User } from '@/types/user';
import { ModalEdit } from '@/components/modals/ModalEdit';
import { GET_USERS } from '@/graphql/queries/queries';
import { UPDATE_USER } from '@/graphql/mutations';
import Head from 'next/head';

const Users = () => {
    const { data, loading, error } = useQuery(GET_USERS);
    const [updateUser] = useMutation(UPDATE_USER);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleUserSave = async (id: number, name: string, role: string) => {
        setLoadingEdit(true);
        try {
            await updateUser({
                variables: { id, name, role },
                refetchQueries: [{ query: GET_USERS }],
            });
            setLoadingEdit(false);
            setOpen(false);
        } catch (error) {
            console.error("Error actualizando el usuario: ", error);
        } finally {
            setLoadingEdit(false);
        }
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Financy App - Usuarios</title>
            </Head>
            <div className="flex flex-col">
                <h2 className="font-semibold text-xl text-colorBlack">Gestión de Usuarios</h2>
                <p className='text-sm text-colorBlack/50'>Información general</p>
            </div>
            <div className="w-full h-[49rem] overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Acción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.users.map((user: User) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <button onClick={() => handleEditClick(user)}>
                                            <Pencil size={20} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                {!data || data.users.length === 0 && <p className='w-full my-5'>No hay usuarios disponibles.</p>}
                {loading && <div className='w-full flex flex-col gap-2 items-center justify-center  my-5'>Cargando usuarios... <LoaderCircle size={20} className="animate-spin" /></div>}
                {error && <p className='w-full my-5'>Error al cargar los usuarios: <b>{error.message}</b></p>}
            </div>

            {selectedUser && (
                <ModalEdit
                    initialId={selectedUser.id}
                    initialName={selectedUser.name}
                    initialRole={selectedUser.role}
                    onSave={(id, name, role) => handleUserSave(id, name, role)}
                    open={open}
                    setOpen={setOpen}
                    loadingEdit={loadingEdit}
                    setLoadingEdit={setLoadingEdit}
                />
            )}
        </DashboardLayout>
    );
}

export default Users;
