import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { getUsers } from '../services/users.service';
import { logOut } from '../services/auth.service';
import { Context } from '../context';

const HomePage: React.FC = () => {
    const { getUser, logout } = useContext(Context);
    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        try {
            setLoading(true);
            const user = getUser();

            user && logOut(user).then(logout);
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button variant="danger" onClick={handleLogout} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Logout'}
            </Button>
            <h1>Users</h1>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Last Login Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user: any) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.registrationDate}</td>
                        <td>{user.lastLoginDate}</td>
                        <td>{user.status}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default HomePage;
