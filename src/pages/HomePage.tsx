import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

interface User {
    id: number;
    name: string;
    email: string;
    registrationDate: string;
    lastLoginDate: string;
    status: string;
}

const HomePage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Simulated API call to fetch users data
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users'); // Replace with your API endpoint
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
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
                {users.map((user) => (
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
